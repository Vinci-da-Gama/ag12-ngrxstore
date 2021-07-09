import { createAction, props } from '@ngrx/store';

import { LOGIN, LOGOUT } from '../types';
import { UserMode } from '../../contracts/modes/user-mode/user';
// import { AuthStateInterface } from '../../contracts/store/auth/AuthStateInterface';

export const Login = createAction(LOGIN, props<{user: UserMode}>());

export const Logout = createAction(LOGOUT);
