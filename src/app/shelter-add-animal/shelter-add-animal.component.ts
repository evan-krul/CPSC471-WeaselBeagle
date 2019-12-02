import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {of} from 'rxjs';

@Component({
  selector: 'app-shelter-add-animal',
  templateUrl: './shelter-add-animal.component.html',
  styleUrls: ['./shelter-add-animal.component.css']
})
export class ShelterAddAnimalComponent implements OnInit {
  SERVER_URL = 'http://localhost:4300/api/animal/add';

  public animalForm;
  private breeds;
  private account;
  private accountData;
  notifier;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private notifierService: NotifierService) {
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));
    this.notifier = notifierService;

    this.animalForm = this.formBuilder.group({
      chipID: null,
      name: '',
      animalType: '',
      breed: '',
      birthDate: null,
      traits: []
    });

    this.onChanges();
  }


  onSubmit(newAnimalData) {
    newAnimalData.shelterID = this.accountData.shelterID;
    console.log(newAnimalData);

    this.httpClient.post<any>(this.SERVER_URL, newAnimalData).subscribe(
      (res) => {
        this.notifier.notify('success', newAnimalData.name + ' is ready to find a new home!');
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
}

