import { Component, Input } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service'
import { Register } from './../../models/request/authentication'
import { Token, UserRegister } from './../../models/response/authentication'
import { NotificationService } from './../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  @Input() registerRequest: Register;

  public showSuccessMessage: boolean
  public successMessage: string

  constructor(private router: Router,
    private notificationService: NotificationService, 
    private service: AuthenticationService) {
      
    this.registerRequest = new Register();
    this.showSuccessMessage = false;
  }

  register() {
    this.service.register(this.registerRequest)
      .subscribe(
        (response: UserRegister) => {
          this.notificationService.success(`User ${response.username} registered with success!`);
          this.router.navigateByUrl('/login')
        },
        (error: HttpErrorResponse) => {
          this.notificationService.error(error.message);
        });
  }
}
