import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  notNull<T>(value: T):boolean{
    return value !== null;
  }

  notUndefined<T>(value: T):boolean{
    return value !== undefined;
  }

  notNullOrUndefined<T>(value: T) : boolean {
    return this.notUndefined(value) && this.notNull(value);
  }

  isDisplayArray<T>(array: T[]) : boolean {
    return (this.notNullOrUndefined(array) && Array.isArray(array) && array.length>0);
  }
}
