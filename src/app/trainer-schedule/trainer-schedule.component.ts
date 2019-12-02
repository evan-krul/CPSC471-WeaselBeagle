import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import {HttpClient} from '@angular/common/http';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-trainer-schedule',
  templateUrl: './trainer-schedule.component.html',
  styleUrls: ['./trainer-schedule.component.css']
})
export class TrainerScheduleComponent implements OnInit {
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  SERVER_URL_GET = 'http://localhost:4300/api/trainer/schedule';
  SERVER_URL_POST = 'http://localhost:4300/api/trainer/schedule/add';
  SERVER_URL_DELETE = 'http://localhost:4300/api/trainer/schedule/delete';
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
    console.log(arg);
  }
}
