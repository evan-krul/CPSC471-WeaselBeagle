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

  SERVER_URL = 'http://localhost:4300/api/animal/all/';

  private animals;
  private account;
  private accountData;
  private type;
  public filterForm;
  private breeds;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));

    this.filterForm = this.formBuilder.group({
      breed: '',
      animalAge: null,
      traits: []
    });
  }

  ngOnInit() {
    this.getAnimals();
   // this.getAsyncBreeds(this.type);
    this.onChanges();
  }
  getAnimals() {
    this.httpClient.get<any>(this.SERVER_URL + this.type, {}).subscribe(
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
    console.log(newAnimalData);

    this.httpClient.post<any>(this.SERVER_URL, newAnimalData).subscribe(
      (res) => {
        this.router.navigateByUrl('adopter/' + this.type);
      },
      (err) => {
        console.log(err);
      }
    );
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
}
