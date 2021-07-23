import { ShoppingListStateInterface } from './sl/ShoppingListStateInterface';
import { AuthStateInterface } from './auth/AuthStateInterface';
import { RecipeStateInterface } from './recipes/RecipeStateInterface';

export interface AppStoreStateInterface {
    shoppingListReducer: ShoppingListStateInterface;
    AuthReducer: AuthStateInterface;
    recipeReducer: RecipeStateInterface;
};
