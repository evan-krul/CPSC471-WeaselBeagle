import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  SERVER_URL = 'http://localhost:4300/api/register';

  public registerForm;
  notifier;

  public isShelterReg: boolean;
  public shelterId;
  public href: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService) {
    this.notifier = notifierService;

    this.isShelterReg = this.route.snapshot.paramMap.has('shelter_id');
    if (this.isShelterReg) {
      this.shelterId = this.route.snapshot.paramMap.get('shelter_id');
    }
    this.href = 'http://localhost:4300' + this.router.url;

    this.registerForm = this.formBuilder.group({
      email: '',
      fname: '',
      lname: '',
      address: '',
      password: '',
      primaryPhone: '',
      secondaryPhone: '',
      accountType: '',
      shelterID: null
    });
  }

  onSubmit(newUserData) {
    if(this.isShelterReg) {
      newUserData.shelterID = this.shelterId;
      newUserData.accountType = 'Shelter_Emp';
    }
    this.httpClient.post<any>(this.SERVER_URL, newUserData).subscribe(
      (res) => {
        this.notifier.notify('success', 'Welcome to Weasel Beagle');
        this.router.navigateByUrl('login');
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
