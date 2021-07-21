import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import apiRelated from '../../../constants/api-related';
// no need to worry, when do deployment, the angular-cli will switch for you autoly,
// just need to prepare apikey for both env and env.prod files in environments folder.
// so, here u just need to import '../../../environments/environment'
import { environment } from '../../../environments/environment';
import { AuthenRespInterface } from '../../../contracts/interfaces/authen/authen-resp';
import { EmailPswdInterface } from '../../../contracts/interfaces/emailPswd/email-pswd';
import { UserMode } from '../../../contracts/modes/user-mode/user';
import { AppStoreStateInterface } from '../../../contracts/store/AppStoreStateInterface';
import { AuthenticateSuccess, Logout } from '../../../store/authStore/auth.actions';

@Injectable({
	providedIn: 'root'
})
export class AuthenService {

	// userWatcher = new BehaviorSubject<UserMode | null>(null);
	private tokenExpirationTimer: any;

	constructor(
		private httpCli: HttpClient,
		private router: Router,
		private store: Store<AppStoreStateInterface>
	) { }

	setLogoutTimer(expirationDuration: number) {
	  this.tokenExpirationTimer = setTimeout(() => {
		this.store.dispatch(Logout());
	  }, expirationDuration);
	}

	clearLogoutTimer() {
	  if (this.tokenExpirationTimer) {
		clearTimeout(this.tokenExpirationTimer);
		this.tokenExpirationTimer = null;
	  }
	}

	/* signup = (data: EmailPswdInterface) => {
		return this.httpCli.post<AuthenRespInterface>(`${apiRelated.authBaseUrl}${apiRelated.su}?key=${environment.firebaseApiKey}`, {
			...data,
			returnSecureToken: true
		}).pipe(
			catchError(this.handleError),
			tap((resp) => {
				this.handleAuthenticatedUser(
					resp.email, resp.localId,
					resp.idToken, +resp.expiresIn
				);
			})
		);
	}

	login = (data: EmailPswdInterface) => {
		return this.httpCli.post<AuthenRespInterface>(`${apiRelated.authBaseUrl}${apiRelated.si}?key=${environment.firebaseApiKey}`, {
			...data,
			returnSecureToken: true
		}).pipe(
			catchError(this.handleError),
			tap((resp) => {
				this.handleAuthenticatedUser(
					resp.email, resp.localId,
					resp.idToken, +resp.expiresIn
				);
			})
		);
	} */

	/* autoLogin = () => {
		const storedUser: UserMode = this.getUserDataToLocalStorage();
		if (!storedUser || new Date().getTime() >= new Date(storedUser['_tokenExpiredOnDate']).getTime()) {
			return;
		}
		const loadedUser = new UserMode(
			storedUser.email,
			storedUser.localUserId,
			storedUser['_token'],
			new Date(storedUser['_tokenExpiredOnDate'])
		);
		if (loadedUser.token) {
			// this.userWatcher.next(loadedUser);
			this.store.dispatch(AuthenticateSuccess({ user: loadedUser }));
			const expirationTimeSpan: number = new Date(storedUser['_tokenExpiredOnDate']).getTime() - new Date().getTime();
			this.autoLogout(expirationTimeSpan);
		}
	} */

	/* logout = () => {
		// this.userWatcher.next(null);
		this.store.dispatch(Logout());
		this.router.navigate(['/auth']);
		localStorage.removeItem('userData');
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	} */

	/* autoLogout = (expirationDuraction: number) => {
		this.tokenExpirationTimer = setTimeout(() => {
			// this.logout();
		}, expirationDuraction)
	} */

	/* private setUserDataToLocalStorage = (user: UserMode): void => {
		localStorage.setItem('userData', JSON.stringify(user))
	}

	private getUserDataToLocalStorage = () => localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData') || ''); */

	/* private handleAuthenticatedUser = (
		email: string,
		userLocalId: string,
		token: string,
		expiresIn: number
	) => {
		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
		const user = new UserMode(email, userLocalId, token,  expirationDate);
		console.log('113 -- user: ', user);
		// this.userWatcher.next(user);
		this.store.dispatch(AuthenticateSuccess({ user }));
		this.setUserDataToLocalStorage(user);
	}

	private handleError = (errRes: HttpErrorResponse) => {
		let errMsg: string = 'Unknown error happen...';
		if (!errRes.error || !errRes.error.error) {
			return throwError(errMsg);
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
		return throwError(errMsg);
	} */

}
