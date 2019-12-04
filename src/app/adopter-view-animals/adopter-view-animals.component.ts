import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-adopter-view-animals',
  templateUrl: './adopter-view-animals.component.html',
  styleUrls: ['./adopter-view-animals.component.css']
})
export class AdopterViewAnimalsComponent implements OnInit {

  SERVER_URL = 'http://localhost:4300/api/animal/all';

  private animals;
  private account;
  private accountData;
  private type;
  public filterForm;
  private breeds;
  private temp;
  notifier;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router, private notifierService: NotifierService) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));
    this.notifier = notifierService;

    this.filterForm = this.formBuilder.group({
      breed: '',
      animalAge: null,
    });
  }

  ngOnInit() {
    this.getAnimals();
    this.onChanges();
  }
  getAnimals() {
    console.log(this.type);
    this.httpClient.get<any>(this.SERVER_URL, {
      params: {
        type: this.type,
        breed: this.filterForm.value.breed,
        animalAge: this.filterForm.value.animalAge,
      }
    }).subscribe(
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

  onSubmit(newAnimalData) {
    this.getAnimals();
    console.log(newAnimalData);
  }

  onChanges(): void {
      this.getAsyncBreeds(this.type);
      console.log(this.type);
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

  clearForm() {
    this.filterForm.reset();
    this.getAnimals();
  }
}
