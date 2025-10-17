import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { environment } from '../environments/environment';
import { AuthService } from './login/shared/auth.service';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, BreadcrumbComponent, LoaderComponent],
  providers: [BsModalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected title = 'Vein360.Donor';

  get userIsLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get userIsDonor() {
    return this.authService.isDonor();
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  protected goToDonorPortal() {
    window.location.href = `${environment.donorPortalUrl}?sso=true&id=${this.authService.userId}`;
  }
}
