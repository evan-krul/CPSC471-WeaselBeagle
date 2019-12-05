import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-adoption-application',
  templateUrl: './adoption-application.component.html',
  styleUrls: ['./adoption-application.component.css']
})
export class AdoptionApplicationComponent implements OnInit {
  SERVER_URL = 'http://localhost:4300/api/animal/get/';
  SERVER_URL_GET = 'http://localhost:4300/api/application/add';

  private account;
  private animalID;
  private animalInfo;
  private applicationData;
  notifier;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private router: Router,
              private notifierService: NotifierService) {
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.animalID = this.route.snapshot.paramMap.get('animal_id');
    this.notifier = notifierService;

    this.applicationData = this.formBuilder.group({
      chipID: this.animalID,
      email: this.account.email,
      adoptionStatus: 'pending'
    });

    this.getAnimal();
  }

  ngOnInit() {
  }

  getAnimal() {
    this.httpClient.get<any>(this.SERVER_URL + this.animalID, {}).subscribe(
      (res) => {
        this.animalInfo = res;
        console.log(this.animalInfo);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    console.log(this.animalID);
    console.log(this.applicationData);

    this.httpClient.post<any>(this.SERVER_URL_GET, this.applicationData).subscribe(
      (res) => {
        this.notifier.notify('success', 'Thank you for submitting an application!');
        this.router.navigateByUrl('/adopter/' + this.animalInfo.animalType);
      },
      (err) => {
        this.notifier.notify('error', 'Error: ' + err.error.message);
        console.log(err);
      }
    );
  }

}
