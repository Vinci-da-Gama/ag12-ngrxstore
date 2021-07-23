import { createAction, props } from '@ngrx/store';

import {
  LOGIN_START,
  SIGNUP_START,
	AUTO_LOGIN,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_CLEAR_ERROR,
  LOGOUT,
	AUTO_LOGOUT
} from '../types';
import {
  UserMode
} from '../../contracts/modes/user-mode/user';
import {
  EmailPswdInterface
} from '../../contracts/interfaces/emailPswd/email-pswd';

export const LoginStart = createAction(LOGIN_START, props<EmailPswdInterface>());

export const SignupStart = createAction(SIGNUP_START, props<EmailPswdInterface>());

export const AutoLogin = createAction(AUTO_LOGIN);

export const AuthenticateSuccess = createAction(AUTHENTICATE_SUCCESS, props<{user: UserMode, redirect: boolean}>());

export const AuthenticateFail = createAction(AUTHENTICATE_FAIL, props<{ authError: string }>());

export const ClearError = createAction(AUTHENTICATE_CLEAR_ERROR);

export const Logout = createAction(LOGOUT);
