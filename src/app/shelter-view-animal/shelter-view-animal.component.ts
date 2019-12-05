import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-shelter-view-animal',
  templateUrl: './shelter-view-animal.component.html',
  styleUrls: ['./shelter-view-animal.component.css']
})
export class ShelterViewAnimalComponent implements OnInit {
  SERVER_URL_GET = 'http://localhost:4300/api/animal/get/';
  SERVER_URL_GET_TRAITS = 'http://localhost:4300/api/animal/get_traits/';

  private animalID;
  private animalInfo;
  private animalTraits;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.animalID = this.route.snapshot.paramMap.get('animal_id');
    this.getAnimal();
  }


  ngOnInit() {
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

}
