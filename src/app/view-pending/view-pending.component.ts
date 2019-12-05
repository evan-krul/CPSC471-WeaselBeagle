import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-view-pending',
  templateUrl: './view-pending.component.html',
  styleUrls: ['./view-pending.component.css']
})
export class ViewPendingComponent implements OnInit {
  SERVER_URL = 'http://localhost:4300/api/animal/pending';

  private pending;
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
    this.pending = true;
  }

  ngOnInit() {
    this.getAnimals();
  }
  getAnimals() {
    this.httpClient.get<any>(this.SERVER_URL, {
      params: {
        email: this.account.email
      }
    }).subscribe(
      (res) => {
        this.pending = res.length === 0;
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
