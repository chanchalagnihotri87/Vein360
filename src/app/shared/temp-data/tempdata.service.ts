import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TempDataService {
  private _data: any;

  constructor() {}

  setData(key: string, data: any) {
    this._data = {};
    this._data[key] = data;
  }

  getData(key: string) {
    if (!this._data) {
      return undefined;
    }

    const dataValue = this._data[key];

    this._data = {};

    return dataValue;
  }
}
