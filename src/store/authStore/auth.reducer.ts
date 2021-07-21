import { createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from '../../contracts/store/auth/AuthStateInterface';
import * as AuthActions from './auth.actions';

const AuthInitState: AuthStateInterface = {
  user: null,
  authError: null,
  loading: false
};

export const AuthReducer = createReducer(
  AuthInitState,
  on(
    AuthActions.LoginStart,
    (state) => ({
      ...state,
      authError: null,
      loading: true
    })
  ),
  on(
    AuthActions.SignupStart,
    (state) => ({
      ...state,
      authError: null,
      loading: true
    })
  ),
  on(
    AuthActions.AuthenticateSuccess,
    (state, {
      user
    }) => ({
      ...state,
      user,
			authError: null,
			loading: false
    })
  ),
  on(
    AuthActions.AuthenticateFail,
    (state, {
      authError
    }) => ({
      ...state,
      user: null,
			authError,
			loading: false
    })
  ),
  on(
    AuthActions.ClearError,
    (state) => ({
      ...state,
      authError: null
    })
  ),
  on(
    AuthActions.Logout,
    (state) => ({
      ...state,
      user: null,
      authError: null
    })
  )
);

/* import { AuthStateInterface } from '../../contracts/store/auth/AuthStateInterface';

const authInitState: AuthStateInterface = {
    user: null
};

export default (state = authInitState, { type, payload }: any) => {
    switch (type) {
    case typeName:
        return { ...state, ...payload }
    default:
        return state;
    }
} */
