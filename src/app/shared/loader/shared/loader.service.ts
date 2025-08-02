import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = signal<boolean>(false);

  constructor() {}

  public get isLoading() {
    return this.loading.asReadonly();
  }

  public show() {
    this.loading.set(true);
  }

  public hide() {
    this.loading.set(false);
  }
}
