import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import apiRelated from '../../constants/api-related';
import { EmailPswdInterface } from '../../contracts/interfaces/emailPswd/email-pswd';
import { AuthenRespInterface } from '../../contracts/interfaces/authen/authen-resp';
import { UserMode } from '../../contracts/modes/user-mode/user';
import { AuthenService } from '../../services/external/authen/authen.service';
import {
	LOGIN_START,
	SIGNUP_START,
	AUTO_LOGIN,
	AUTHENTICATE_SUCCESS,
	LOGOUT,
	AUTO_LOGOUT
} from '../types';
import { AuthenticateSuccess, AuthenticateFail, Logout, AutoLogin } from './auth.actions';

const handleAuthenticatedUser = (
  email: string,
  userLocalId: string,
  token: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new UserMode(email, userLocalId, token, expirationDate);
  console.log('32 -- user: ', user);
  localStorage.setItem('userData', JSON.stringify(user))
  return AuthenticateSuccess({
    user,
		redirect: true
  })
}

const handleError = (errRes: HttpErrorResponse) => {
  let errMsg: string = 'Unknown error happen...';
  if (!errRes.error || !errRes.error.error) {
    return of(AuthenticateFail({
      authError: errMsg
    }));
  }
  switch (errRes.error.error.message) {
    case "EMAIL_EXISTS":
      errMsg = 'This email exists already.';
      break;
    case "OPERATION_NOT_ALLOWED":
      errMsg = 'This operation is not allowed. Password sign-in is disabled for this project';
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errMsg = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
    case "EMAIL_NOT_FOUND":
      errMsg = 'There is no user record corresponding to this identifier. The user may have been deleted.';
      break;
    case "INVALID_PASSWORD":
      errMsg = 'The password is invalid or the user does not have a password.';
      break;
    case "USER_DISABLED":
      errMsg = 'The user account has been disabled by an administrator.';
      break;
    default:
      errMsg = 'Unknown error happen...';
      break;
  }
  return of(AuthenticateFail({
    authError: errMsg
  }));
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private httpCli: HttpClient,
    private router: Router,
    private authServ: AuthenService
  ) {}

  private getUserDataToLocalStorage = () => localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData') || '');

  authSignup$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(SIGNUP_START),
    switchMap(({
      email,
      password
    }: EmailPswdInterface) => {
      return this.httpCli.post<AuthenRespInterface> (`${apiRelated.authBaseUrl}${apiRelated.su}?key=${environment.firebaseApiKey}`, {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        tap(resp => {
          this.authServ.setLogoutTimer(+resp.expiresIn * 1000);
        }),
        map((respData: AuthenRespInterface) => {
          return handleAuthenticatedUser(
            respData.email, respData.localId,
            respData.idToken, +respData.expiresIn
          );
        }),
        catchError((errRes) => {
          return handleError(errRes);
        })
      )
    })
  ));

  authLogin$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap(({
      email,
      password
    }: EmailPswdInterface) => {
      return this.httpCli.post<AuthenRespInterface> (`${apiRelated.authBaseUrl}${apiRelated.si}?key=${environment.firebaseApiKey}`, {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        tap(resp => {
          this.authServ.setLogoutTimer(+resp.expiresIn * 1000);
        }),
        map((respData: AuthenRespInterface): any => {
          return handleAuthenticatedUser(
            respData.email, respData.localId,
            respData.idToken, +respData.expiresIn
          );
        }),
        catchError((errRes) => {
          return handleError(errRes);
        })
      )
    })
  ));

  authRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(AUTHENTICATE_SUCCESS),
    tap((authSuccessActionPayload: { user: UserMode, redirect: boolean }) => {
			authSuccessActionPayload.redirect && this.router.navigate(['/recipes']);
    })
  ), { dispatch: false });

  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AUTO_LOGIN),
    map(() => {
      const storedUser: UserMode = this.getUserDataToLocalStorage();
      console.log('152 -- EMPTY: ', EMPTY)
      if (!storedUser || new Date().getTime() >= new Date(storedUser['_tokenExpiredOnDate']).getTime()) {
        return {
          type: 'DUMMY'
        };
        // return EMPTY; // cannot use EMPTY, EMPTY is an obj, we just want to return reducer an non-exist type to jump over some unknow error.
      }
      const loadedUser = new UserMode(
        storedUser.email,
        storedUser.localUserId,
        storedUser['_token'],
        new Date(storedUser['_tokenExpiredOnDate'])
      );
      if (loadedUser.token) {
        const expirationTimeSpan: number = new Date(storedUser['_tokenExpiredOnDate']).getTime() - new Date().getTime();
        this.authServ.setLogoutTimer(expirationTimeSpan);
        return AuthenticateSuccess({
          user: loadedUser,
					redirect: false
        });
        // this.autoLogout(expirationTimeSpan);
      }
      return {
        type: 'DUMMY'
      };
      // return EMPTY;
    })
  ));

  authLogout$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => {
      this.authServ.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  ), {
    dispatch: false
  });

};
