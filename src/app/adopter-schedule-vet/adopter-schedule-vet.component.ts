import {Component, OnInit, ViewChild} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-adopter-schedule-vet',
  templateUrl: './adopter-schedule-vet.component.html',
  styleUrls: ['./adopter-schedule-vet.component.css']
})
export class AdopterScheduleVetComponent implements OnInit {
  private animalID;
  private animalHistory;
  private animalInfo;
  private vets;
  private vetEmail;
  private eventColor = 'green';
  private account;

  SERVER_URL_GET_HISTORY = 'http://localhost:4300/api/vet/attends/';
  SERVER_URL_GET = 'http://localhost:4300/api/animal/get/';
  SERVER_URL_GET_VETS = 'http://localhost:4300/api/vet/all_vets';
  SERVER_URL_GET_VETS_SCHEDULE = 'http://localhost:4300/api/vet/schedule';
  SERVER_URL_ADD_APPOINTMENT = 'http://localhost:4300/api/vet/appointment/add';
  SERVER_URL_DELETE_APPOINTMENT = 'http://localhost:4300/api/vet/appointment/delete';
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  calendarEvents = [
  ];
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private notifierService: NotifierService
  ) {
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.animalID = this.route.snapshot.paramMap.get('animal_id');
    this.getVets();

    this.getAnimal();

  }

  ngOnInit() {
  }

  private getAppointments() {
    this.httpClient.get<any>(this.SERVER_URL_GET_HISTORY + this.account.email, { params: {
        chipID: this.animalID
      }
    }).subscribe(
      (res) => {
        this.animalHistory = res;
        const bookedEvents = res.map(event => ({
          title: 'T: ' + event.name,
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


  getAnimal() {
    this.httpClient.get<any>(this.SERVER_URL_GET + this.animalID, {}).subscribe(
      (res) => {
        this.animalInfo = res;
        console.log(this.animalInfo);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getVets() {
    this.httpClient.get<any>(this.SERVER_URL_GET_VETS, {}).subscribe(
      (res) => {
        this.vets = res.map(vet => ({value: vet.email, text: vet.name}));
        console.log(this.vets);
        this.vetEmail = this.vets[0].value;

        this.updateCal(this.vets[0].value);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  updateCal(email) {
    console.warn('Getting schedule for: ' + email);
    this.vetEmail = email;
    const httpData = {
      email: email
    };
    this.httpClient.get<any>(this.SERVER_URL_GET_VETS_SCHEDULE, {
      params: httpData
    }).subscribe(
      (res) => {
        this.calendarEvents = [];
        this.calendarEvents = this.calendarEvents.concat(
          res
        );
        console.log(this.calendarEvents);

        this.getAppointments();
      },
      (err) => {
        console.log(err);
      }
    );
  }



  handleEventClick(arg) {
    console.log(arg);
    if (arg.event.backgroundColor !== this.eventColor) {
      const addAppointment = {
        email: this.vetEmail,
        date: arg.event.start.toISOString().split('V')[0],
        chipID: this.animalID
      };
      this.httpClient.post<any>(this.SERVER_URL_ADD_APPOINTMENT, addAppointment).subscribe(
        (res) => {
          this.notifierService.notify('success', 'A vet appointment for ' + this.animalInfo.name + ' has been booked!');
          this.updateCal(this.vetEmail);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  isFutureDate(date) {
    const currentDate = new Date();
    const itemDate = new  Date(date);
    return currentDate < itemDate;
  }

  deleteAppointment(email, date) {
    const removeDate = {
      email: email,
      date: date
    };
    this.httpClient.post<any>(this.SERVER_URL_DELETE_APPOINTMENT, removeDate).subscribe(
      (res) => {
        this.updateCal(email);
      },
      (err) => {
        console.log(err);
      }
    );
    // console.log($event);
  }
}
