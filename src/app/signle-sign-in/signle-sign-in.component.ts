import { Component, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../login/shared/account-service';
import { AuthService } from '../login/shared/auth.service';
import AuthenticationResponse from '../login/shared/authentication-response.model';
import { SingleSignInService } from './shared/single-sign-in.service';

@Component({
  selector: 'app-signle-sign-in',
  imports: [],
  templateUrl: './signle-sign-in.component.html',
  styleUrl: './signle-sign-in.component.scss',
})
export class SignleSignInComponent implements OnInit {
  id = input<string>('');
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly singleSignInService: SingleSignInService
  ) {
    this.accountService
      .signIn('chanchalagnihotri1987@gmail.com', 'chanchal')
      .subscribe((authResponse) => {
        this.authService.logIn(authResponse);

        this.router.navigate(['']);
      });
  }

  ngOnInit(): void {
    if (
      this.authService.isLoggedIn() &&
      this.authService.userId === this.id()
    ) {
      this.router.navigate(['']);
      return;
    }

    this.singleSignInService.signIn(this.id()).subscribe({
      next: (authResponse: AuthenticationResponse) => {
        debugger;
        this.authService.logIn(authResponse);

        this.router.navigate(['']);
      },
      error: (error) => {
        this.router.navigate(['/login']);
      },
    });
  }
}
