import { Ingredient } from '../../modes/ingredient.model';

export interface ShoppingListStateInterface {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientIndex: number;
}
