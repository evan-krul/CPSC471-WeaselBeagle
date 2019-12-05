import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-view-adopted',
  templateUrl: './view-adopted.component.html',
  styleUrls: ['./view-adopted.component.css']
})
export class ViewAdoptedComponent implements OnInit {

  SERVER_URL = 'http://localhost:4300/api/animal/status';

  private approved;
  private animals;
  private account;
  private accountData;
  notifier;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router, private notifierService: NotifierService) {
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));
    this.notifier = notifierService;
    this.approved = false;
  }

  ngOnInit() {
    this.getAnimals();
  }
  getAnimals() {
    this.httpClient.get<any>(this.SERVER_URL, {
      params: {
        email: this.account.email,
        status: 'approved'
      }
    }).subscribe(
      (res) => {
        this.approved = res.length === 0;
        this.animals = [];
        this.animals = this.animals.concat(
          res
        );
        console.log(this.animals);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(newAnimalData) {
    this.getAnimals();
    console.log(newAnimalData);
  }
}
