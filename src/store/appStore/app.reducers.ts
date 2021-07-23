import { ActionReducerMap } from '@ngrx/store';

/* import { ShoppingListStateInterface } from '../../contracts/store/sl/ShoppingListStateInterface';
import { AuthStateInterface } from '../../contracts/store/auth/AuthStateInterface'; */
import { AppStoreStateInterface } from '../../contracts/store/AppStoreStateInterface';
import * as SlActions from '../slStore/sl.actions';
import shoppingListReducer from '../slStore/sl.reducer';
import { AuthReducer } from '../authStore/auth.reducer';
import { recipeReducer } from '../recipeStore/recipe.reducer';

/**
 * if use old way to do action, need to do this;
 * then new way is createAction (auth.actions.ts), it is a function,
 * no need to export action types.
 */
type StoreActionsType = SlActions.SlActionType;

export const reducers: ActionReducerMap<AppStoreStateInterface, StoreActionsType> = {
	shoppingListReducer,
	AuthReducer,
	recipeReducer
}
