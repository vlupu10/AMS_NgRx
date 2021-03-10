import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../../environments/environment';
import { WindowRef } from '../common/global-refs';
import { LoaderService } from './loader.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly oauthService: OAuthService,
    private readonly router: Router,
    private readonly windowRef: WindowRef,
    private readonly loaderService: LoaderService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authCodeFlowConfig: AuthConfig = {
      // issuer: `${ environment.IDENTITY_URL }`,
      redirectUri: `${ environment.APP_PATH }`,
      // clientId: `${ environment.IDENTITY_ID }`,
      responseType: 'code',
      scope: 'openid profile email estimating time',
      showDebugInformation: true,
      sessionChecksEnabled: true,
      logoutUrl: `${ environment.APP_PATH }`,
      customQueryParams: {
        acr_values: 'tenant:lmn',
      },
    };

    if (next.queryParams.authCode) {
      (authCodeFlowConfig.customQueryParams as any).authCode = next.queryParams.authCode;
    }

    this.loaderService.pushRequest();

    this.oauthService.events.subscribe(event => {
      if (event.type === 'session_changed') {
        this.oauthService.revokeTokenAndLogout();
      }
    });
    this.oauthService.configure(authCodeFlowConfig);

    return this.oauthService.loadDiscoveryDocumentAndLogin({state: state.url})
      .then(
        loggedIn => {
          if (loggedIn) {
            this.loaderService.removeRequest();
            if (next.queryParams.scope) {
              // replaceAll does not work at the moment, have to replace manually
              const route = this.oauthService.state ? this.oauthService.state.split('%2F')
                .join('/')
                .split('%3F')
                .join('?') : '';
              const questionMark = route.indexOf('?');
              const navigationRoute = (questionMark !== -1) ? route.substring(0, questionMark) : route;
              this.router.navigate([navigationRoute]);
            }
          }

          return loggedIn;
        }
      );
  }
}
