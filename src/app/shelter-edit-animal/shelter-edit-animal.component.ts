import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-shelter-edit-animal',
  templateUrl: './shelter-edit-animal.component.html',
  styleUrls: ['./shelter-edit-animal.component.css']
})
export class ShelterEditAnimalComponent  implements OnInit {
  SERVER_URL = 'http://localhost:4300/api/animal/update';
  SERVER_URL_GET = 'http://localhost:4300/api/animal/get/';

  public animalForm;
  private breeds;
  private account;
  private accountData;

  private animalID;
  private animalInfo;
  // private animalTraits;

  notifier;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService) {
    this.animalID = this.route.snapshot.paramMap.get('animal_id');
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));
    this.notifier = notifierService;
    this.getAnimal();
    this.animalForm = this.formBuilder.group({
      chipID: null,
      name: '',
      animalType: '',
      breed: '',
      birthDate: null,
      // traits: []
    });

    this.onChanges();
  }


  onSubmit(newAnimalData) {
    console.log(newAnimalData);

    this.httpClient.post<any>(this.SERVER_URL, newAnimalData).subscribe(
      (res) => {
        this.notifier.notify('success', newAnimalData.name + ' has been updated!');
        this.router.navigateByUrl('shelter/animals');
      },
      (err) => {
        this.notifier.notify('error', 'Error: ' + err.error.message);
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }


  onChanges(): void {

    this.animalForm.get('animalType').valueChanges.subscribe(val => {
      this.getAsyncBreeds(val);
      console.log(val);
    });
  }

  private getAsyncBreeds(type) {
    let apiURL;
    switch (type) {
      case 'dog':
        apiURL = 'https://api.thedogapi.com/v1/breeds';

        break;
      case 'cat':
        apiURL = 'https://api.thecatapi.com/v1/breeds';
        break;
      case 'other':
        apiURL = '';
        break;
    }

    this.httpClient.get<any>(apiURL, {}).subscribe(
      (res) => {
        this.breeds = [];
        const result = res.map(breed => ({value: breed.id, text: breed.name}));
        this.breeds = this.breeds.concat(
          result
        );
      },
      (err) => {
        this.breeds = [];
        console.log(err);
      }
    );

  }


  private getAnimal() {
    this.httpClient.get<any>(this.SERVER_URL_GET + this.animalID, {}).subscribe(
      (res) => {
        this.animalInfo = res;

        this.animalInfo.birthDate = this.animalInfo.birthDate.split('T')[0];
        this.animalForm = this.formBuilder.group({
          chipID: this.animalInfo.chipID,
          name: this.animalInfo.name,
          birthDate: this.animalInfo.birthDate,
          // traits: []
        });



        console.log(this.animalInfo);
      },
      (err) => {
        console.log(err);
      }
    );


    // this.httpClient.get<any>(this.SERVER_URL_GET_TRAITS + this.animalID, {}).subscribe(
    //   (res) => {
    //     this.animalTraits = res;
    //     console.log(this.animalTraits);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}

