import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { WindowRef } from '../common/global-refs';
import { LoaderService } from './loader.service';

const ERROR_MESSAGES = {
    INTERNET_CONNECTION: 'Please check your internet connection and try again',
    DEFAULT: 'Something went wrong',
  };

@Injectable()
  export class RequestInterceptor implements HttpInterceptor {

    constructor(
      private readonly windowRef: WindowRef,
      private readonly loaderService: LoaderService,
      private readonly oauthService: OAuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let customHeaders: HttpHeaders = new HttpHeaders();
        const accessToken = this.oauthService.getAccessToken();
        const requestType = request.params.get('requestType');
        const requestResponseType = request.responseType;
        const URL = environment.API_URL;

        // Do not add Content-Type on upload reqeusts to avoid Unsupported Media Type error
        if (requestType !== 'upload') {
            customHeaders = customHeaders.set('Content-Type', 'application/json');
        }

        if (accessToken) {
            customHeaders = customHeaders.set('Authorization', `Bearer ${ accessToken }`);
        }

        // tslint:disable-next-line: no-parameter-reassignment
        request = request.clone({
            params: request.params.delete('requestType'),
            headers: customHeaders,
            responseType: requestResponseType ? requestResponseType : 'json',
            url: URL + '/' + request.url,
        });

        // send request without spinner and error handling
        if (requestType === 'silent') {
            return next.handle(request)
            .pipe(
                timeout(400000),
                catchError(res => {
                this.handleError(res);
                throw res;
                })
            );
        }

        this.loaderService.pushRequest();

        return next.handle(request)
        .pipe(
          timeout(400000),
          catchError(res => {
            this.handleError(res);
            throw res;
          }),
          finalize(() => {
            this.loaderService.removeRequest();
          })
        );
    }

    private getError(res: HttpErrorResponse): string {
      if (!this.windowRef.nativeWindow.navigator.onLine) {
        return ERROR_MESSAGES.INTERNET_CONNECTION;
      }

      return res.error && (res.error.Message || res.error.error_description) || res.statusText || ERROR_MESSAGES.DEFAULT;
    }

    private handleError(res: HttpErrorResponse): void {
      if (res.status === 401) {
        this.oauthService.revokeTokenAndLogout();
      } else {
        const error = this.getError(res);
        console.log('interceptor handle error', error);
      }
    }
  }
