import {Component} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import {AuthenticationService} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd';
  loggedIn = this.authenticationService.isLoggedIn();
  private account;
  private accountType = 'not_logged_in';

  constructor(private loadingBar: SlimLoadingBarService, private router: Router, private authenticationService: AuthenticationService) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.accountType = this.account.accountType;
      console.log(this.account);
    }
  }

  logout() {
    this.authenticationService.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }
}
