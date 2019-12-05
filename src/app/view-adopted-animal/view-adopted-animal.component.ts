import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-view-adopted-animal',
  templateUrl: './view-adopted-animal.component.html',
  styleUrls: ['./view-adopted-animal.component.css']
})
export class ViewAdoptedAnimalComponent implements OnInit {
  SERVER_URL_GET_HEALTH_RECORDS = 'http://localhost:4300/api/vet/appointments/get-health-record/';
  SERVER_URL_GET = 'http://localhost:4300/api/animal/get/';
  SERVER_URL_GET_TRAITS = 'http://localhost:4300/api/animal/get_traits/';
  SERVER_URL_GET_APPLICATION = 'http://localhost:4300/api/application/this/';

  private animalID;
  private animalInfo;
  private animalTraits;
  private adopted;
  private adoptedInfo;
  private account;
  private healthRecords;
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {

    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.adopted = false;
    this.animalID = this.route.snapshot.paramMap.get('animal_id');
    this.getAnimal();
    this.getApplication();
    this.getHealthRecords();
  }


  ngOnInit() {
  }

  getApplication() {
    this.httpClient.get<any>(this.SERVER_URL_GET_APPLICATION + this.animalID, {
      params: {
        email : this.account.email
      }}).subscribe(
      (res) => {
        console.log('res is here:' + res);
        console.log(res);
        this.adopted = res.length === 0;
        this.adoptedInfo = res[0];
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


    this.httpClient.get<any>(this.SERVER_URL_GET_TRAITS + this.animalID, {}).subscribe(
      (res) => {
        this.animalTraits = res;
        console.log(this.animalTraits);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getHealthRecords() {
    this.httpClient.get<any>(this.SERVER_URL_GET_HEALTH_RECORDS + this.animalID, {}).subscribe(
      (res) => {
        this.healthRecords = res;
        console.log(this.animalInfo);
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
