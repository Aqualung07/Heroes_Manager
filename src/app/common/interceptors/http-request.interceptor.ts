import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, delay, map, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, request.url);
    if (request.method !== 'GET') {
      console.log('I am not a get: ', request.method);
    }
    return next
      .handle(request)
      .pipe(delay(500)) // Simulate server delayed response
      .pipe(
        catchError((err) => {
          this.loadingService.setLoading(false, request.url);
          return err;
        })
      )
      .pipe(
        map((evt) => {
          if (evt instanceof HttpResponse) {
            this.loadingService.setLoading(false, request.url);
          }
          return evt as HttpEvent<any>;
        })
      );
  }
}
