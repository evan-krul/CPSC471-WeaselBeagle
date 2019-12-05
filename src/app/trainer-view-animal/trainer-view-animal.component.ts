import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-trainer-view-animal',
  templateUrl: './trainer-view-animal.component.html',
  styleUrls: ['./trainer-view-animal.component.css']
})
export class TrainerViewAnimalComponent implements OnInit  {

  SERVER_URL_GET_ANIMAL = 'http://localhost:4300/api/animal/get/';
  SERVER_URL_GET_TRAITS = 'http://localhost:4300/api/animal/get_traits/';
  SERVER_URL_GET_HEALTH_RECORDS = 'http://localhost:4300/api/vet/appointments/get-health-record/';
  SERVER_URL_GET_ADOPTER_INFO = 'http://localhost:4300/api/animal/get/adopter/';

  private animalID;
  private animalInfo;
  private animalTraits;
  private healthRecords;
  private adopterInfo;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.animalID = this.route.snapshot.paramMap.get('animal_id');
    this.getAnimal();
    this.getAdopter();
  }

  ngOnInit() {
  }

  getAdopter() {
    this.httpClient.get<any>(this.SERVER_URL_GET_ADOPTER_INFO + this.animalID).subscribe(
      (res) => {
        this.adopterInfo = res;
        console.log(this.animalInfo);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAnimal() {
    this.httpClient.get<any>(this.SERVER_URL_GET_ANIMAL + this.animalID, {}).subscribe(
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

  backClick() {
    this.router.navigate(['/trainer/appointments/animals']);
  }
}
