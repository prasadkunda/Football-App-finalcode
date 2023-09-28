import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class KeyApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiRequest = request.url.startsWith(environment.API_HOST_URL);

    if (isApiRequest) {
      request = request.clone({
        setHeaders: {
          'x-rapidapi-key': environment.API_KEY
        }
      });
    }
    return next.handle(request);
  }
}
