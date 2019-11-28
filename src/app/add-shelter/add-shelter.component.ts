import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-add-shelter',
  templateUrl: './add-shelter.component.html',
  styleUrls: ['./add-shelter.component.css']
})
export class AddShelterComponent implements OnInit {


  SERVER_URL = 'http://localhost:4300/api/register/shelter';

  shelterAddForm;
  notifier;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private notifierService: NotifierService) {
    this.notifier = notifierService;

    this.shelterAddForm = this.formBuilder.group({
      name: '',
      address: '',
      primaryPhone: '',
      secondaryPhone: ''
    });
  }

  onSubmit(newUserData) {
    this.httpClient.post<any>(this.SERVER_URL, newUserData).subscribe(
      (res) => {
        this.notifier.notify('success', 'Your shelter has been added.');
        this.notifier.notify('info', 'Lets add an account!');
        this.router.navigateByUrl('register/shelter_employee/' + res.new_shelter_id);
      },
      (err) => {
        this.notifier.notify('error', 'Error: ' + err.error.message);
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

}
