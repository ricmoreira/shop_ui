import { Component, Input } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service'
import { Login } from './../../models/request/authentication'
import { User } from './../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from './../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  @Input() loginRequest: Login;

  returnUrl: string;

  constructor(private notificationService: NotificationService, private service: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {

    this.loginRequest = new Login();
  }

  ngOnInit() {
    // reset login status
    this.service.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products/list';
  }

  login() {
    this.service.login(this.loginRequest)
      .subscribe(
        (user: User) => {
          this.router.navigateByUrl(this.returnUrl);
        },
        (error: HttpErrorResponse) => {
          this.notificationService.error(error.message);
        });
  }
}
