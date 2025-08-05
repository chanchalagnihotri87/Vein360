import { Routes } from '@angular/router';
import { authGuard } from '../common/guards/auth.guard';
import { ssoGuard } from '../common/guards/sso.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { SignleSignInComponent } from './signle-sign-in/signle-sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ssoGuard, authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'sso/:id', component: SignleSignInComponent },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [authGuard],
  },
];
