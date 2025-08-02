import { Component } from '@angular/core';
import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {}

  get isLoading() {
    return this.loaderService.isLoading();
  }
}
