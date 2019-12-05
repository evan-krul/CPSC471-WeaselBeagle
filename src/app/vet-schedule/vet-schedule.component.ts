import {Component, OnInit, ViewChild} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-vet-schedule',
  templateUrl: './vet-schedule.component.html',
  styleUrls: ['./vet-schedule.component.css']
})
export class VetScheduleComponent implements OnInit {
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  SERVER_URL_GET = 'http://localhost:4300/api/vet/schedule';
  SERVER_URL_POST = 'http://localhost:4300/api/vet/schedule/add';
  SERVER_URL_DELETE = 'http://localhost:4300/api/vet/schedule/delete';
  SERVER_URL_GET_BOOKINGS = 'http://localhost:4300/api/vet/bookings';
  private eventColor = 'green';
  private account;
  calendarEvents = [
  ];
  constructor(
    private httpClient: HttpClient
  ) {
    this.account = JSON.parse(localStorage.getItem('currentUser'));

    this.updateCal();
  }

  updateCal() {
    const httpData = {
      email: this.account.email
    };
    this.httpClient.get<any>(this.SERVER_URL_GET, {
      params: httpData
    }).subscribe(
      (res) => {
        this.calendarEvents = [];
        this.calendarEvents = this.calendarEvents.concat(
          res
        );
        this.getBookings();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

  handleDateClick(arg) {
    console.log(arg);
    const newDate = {
      email: this.account.email,
      date: arg.dateStr
    };
    this.httpClient.post<any>(this.SERVER_URL_POST, newDate).subscribe(
      (res) => {
        this.updateCal();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleEventClick(arg) {
    console.log(arg);
    if (arg.event.backgroundColor !== this.eventColor) {
      const removeDate = {
        email: this.account.email,
        date: arg.event.start.toISOString()
      };
      this.httpClient.post<any>(this.SERVER_URL_DELETE, removeDate).subscribe(
        (res) => {
          this.updateCal();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getBookings() {
    this.httpClient.get<any>(this.SERVER_URL_GET_BOOKINGS, {
      params: {
        email: this.account.email
      }
    }).subscribe(
      (res) => {
        const bookedEvents = res.map(event => ({
          title: 'V: ' + event.petName,
          date: event.date,
          color: this.eventColor
        }));
        this.calendarEvents = this.calendarEvents.concat(bookedEvents);
        console.log(this.calendarEvents);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
