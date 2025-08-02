import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private authService: AuthService) {}

  public get defaultClinicId() {
    return this.authService.defaultClinicId;
  }

  //#endregion
}
