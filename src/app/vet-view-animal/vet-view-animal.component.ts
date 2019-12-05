import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vet-view-animal',
  templateUrl: './vet-view-animal.component.html',
  styleUrls: ['./vet-view-animal.component.css']
})
export class VetViewAnimalComponent implements OnInit {

  SERVER_URL_GET_ANIMAL = 'http://localhost:4300/api/animal/get/';
  SERVER_URL_GET_TRAITS = 'http://localhost:4300/api/animal/get_traits/';
  SERVER_URL_GET_HEALTH_RECORDS = 'http://localhost:4300/api/vet/appointments/get-health-record/';
  ROUTER_URL_ADD_HEALTH_RECORD = '/vet/appointments/add-health-record/';
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
    this.getHealthRecords();
    this.getAdopter();
  }

  ngOnInit() {
  }

  btnClick() {
    this.router.navigate([this.ROUTER_URL_ADD_HEALTH_RECORD + this.animalID]);
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
    this.router.navigate(['/vet/appointments/animals']);
  }
}
