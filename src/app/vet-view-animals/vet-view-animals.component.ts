import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-vet-view-animals',
  templateUrl: './vet-view-animals.component.html',
  styleUrls: ['./vet-view-animals.component.css']
})
export class VetViewAnimalsComponent implements OnInit {
  SERVER_URL_GET = 'http://localhost:4300/api/vet/animals/';

  private animals;
  private account;
  private accountData;

  constructor(
    private httpClient: HttpClient
  ) {
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));
  }

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals() {
    this.httpClient.get<any>(this.SERVER_URL_GET + this.accountData.email, {}).subscribe(
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
