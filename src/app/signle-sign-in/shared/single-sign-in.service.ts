import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../login/shared/auth.service';
import AuthenticationResponse from '../../login/shared/authentication-response.model';

interface SSOResponse {
  redirectUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class SingleSignInService {
  private readonly baseUrl = `${environment.apiUrl}/sso`;

  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  signIn(id: string) {
    return this.httpClient.post<AuthenticationResponse>(
      `${this.baseUrl}/buyer/signin/${id}`,
      {}
    );
  }

  goToBuyerPortal() {
    return this.httpClient.post<SSOResponse>(
      `${this.baseUrl}/donor/${this.authService.userId}`,
      {}
    );
  }
}
