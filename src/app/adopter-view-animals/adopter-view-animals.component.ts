import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-adopter-view-animals',
  templateUrl: './adopter-view-animals.component.html',
  styleUrls: ['./adopter-view-animals.component.css']
})
export class AdopterViewAnimalsComponent implements OnInit {

  SERVER_URL_GET = 'http://localhost:4300/api/animal/all/';

  private animals;
  private account;
  private accountData;
  private type;

  private breeds;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));
  }

  ngOnInit() {
    this.getAnimals();
  }
  getAnimals() {
    this.httpClient.get<any>(this.SERVER_URL_GET + this.type, {}).subscribe(
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
