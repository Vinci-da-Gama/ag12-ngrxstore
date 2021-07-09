import { createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from '../../contracts/store/auth/AuthStateInterface';
import * as AuthActions from './auth.actions';

const AuthInitState: AuthStateInterface = {
		user: null
};

export const AuthReducer = createReducer(
	AuthInitState,
	on(
		AuthActions.Login,
		(state, { user }) => ({ ...state, user })
	),
	on(
		AuthActions.Logout,
		(state) => ({ ...state, user: null })
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
