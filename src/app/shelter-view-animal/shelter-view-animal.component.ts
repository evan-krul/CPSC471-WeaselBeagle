import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-shelter-view-animal',
  templateUrl: './shelter-view-animal.component.html',
  styleUrls: ['./shelter-view-animal.component.css']
})
export class ShelterViewAnimalComponent implements OnInit {
  SERVER_URL_GET = 'http://localhost:4300/api/animal/get/';
  SERVER_URL_GET_TRAITS = 'http://localhost:4300/api/animal/get_traits/';
  SERVER_URL_GET_ADOPTION = 'http://localhost:4300/api/application/';
  SERVER_URL_MAKE_ADOPTION = 'http://localhost:4300/api/application/approve';

  private animalID;
  private animalInfo;
  private animalTraits;
  private animalAdoptionApplications;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private notifierService: NotifierService,
    private router: Router
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

    this.httpClient.get<any>(this.SERVER_URL_GET_ADOPTION + this.animalID, {}).subscribe(
      (res) => {
        this.animalAdoptionApplications = res;
        console.log(this.animalAdoptionApplications);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  approveApplication(adopterEmail) {
    const application = {
      adopterEmail: adopterEmail,
      chipID: this.animalInfo.chipID
    };
    this.httpClient.post<any>(this.SERVER_URL_MAKE_ADOPTION, application).subscribe(
      (res) => {
        this.notifierService.notify('success', this.animalInfo.name + ' has found their home!');
        this.router.navigateByUrl('shelter/animals');

      },
      (err) => {
        console.log(err);
      }
    );
  }
}
