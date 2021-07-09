import { ShoppingListStateInterface } from './sl/ShoppingListStateInterface';
import { AuthStateInterface } from './auth/AuthStateInterface';

export interface AppStoreStateInterface {
    shoppingListReducer: ShoppingListStateInterface,
    AuthReducer: AuthStateInterface
};
