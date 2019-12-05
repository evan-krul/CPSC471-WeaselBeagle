import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private account;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.account = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  ngOnInit() {
    if (this.account.accountType === 'trainer') {
      this.router.navigate(['trainer/appointments/animals']);
    }
    if (this.account.accountType === 'vet') {
      this.router.navigate(['vet/appointments/animals']);
    }
  }

}
