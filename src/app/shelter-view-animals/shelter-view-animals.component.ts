import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {element} from 'protractor';

@Component({
  selector: 'app-shelter-view-animals',
  templateUrl: './shelter-view-animals.component.html',
  styleUrls: ['./shelter-view-animals.component.css']
})
export class ShelterViewAnimalsComponent implements OnInit {
  SERVER_URL_GET = 'http://localhost:4300/api/animal/get/shelter/';

  private animals;
  private account;
  private accountData;

  private breeds;
  constructor(
    private httpClient: HttpClient
  ) {
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));
  }

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals() {
    this.httpClient.get<any>(this.SERVER_URL_GET + this.accountData.shelterID, {}).subscribe(
      (res) => {
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
}
