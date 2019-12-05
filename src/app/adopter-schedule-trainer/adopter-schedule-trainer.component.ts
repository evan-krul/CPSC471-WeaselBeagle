import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-adopter-schedule-trainer',
  templateUrl: './adopter-schedule-trainer.component.html',
  styleUrls: ['./adopter-schedule-trainer.component.css']
})
export class AdopterScheduleTrainerComponent implements OnInit {
  private animalID;
  private animalHistory;
  private animalInfo;
  private trainers;
  private trainerEmail;
  private eventColor = 'green';
  private account;

  SERVER_URL_GET_HISTORY = 'http://localhost:4300/api/trainer/attends/';
  SERVER_URL_GET = 'http://localhost:4300/api/animal/get/';
  SERVER_URL_GET_TRAINERS = 'http://localhost:4300/api/trainer/all_trainers';
  SERVER_URL_GET_TRAINERS_SCHEDULE = 'http://localhost:4300/api/trainer/schedule';
  SERVER_URL_ADD_APPOINTMENT = 'http://localhost:4300/api/trainer/appointment/add';
  SERVER_URL_DELETE_APPOINTMENT = 'http://localhost:4300/api/trainer/appointment/delete';
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
    this.getTrainers();

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

  getTrainers() {
    this.httpClient.get<any>(this.SERVER_URL_GET_TRAINERS, {}).subscribe(
      (res) => {
        this.trainers = res.map(trainer => ({value: trainer.email, text: trainer.name}));
        console.log(this.trainers);
        this.trainerEmail = this.trainers[0].value;

        this.updateCal(this.trainers[0].value);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  updateCal(email) {
    console.warn('Getting schedule for: ' + email);
    this.trainerEmail = email;
    const httpData = {
      email: email
    };
    this.httpClient.get<any>(this.SERVER_URL_GET_TRAINERS_SCHEDULE, {
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
        email: this.trainerEmail,
        date: arg.event.start.toISOString().split('T')[0],
        chipID: this.animalID
      };
      this.httpClient.post<any>(this.SERVER_URL_ADD_APPOINTMENT, addAppointment).subscribe(
        (res) => {
          this.notifierService.notify('success', 'A training session for ' + this.animalInfo.name + ' has been booked!');
          this.updateCal(this.trainerEmail);
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
