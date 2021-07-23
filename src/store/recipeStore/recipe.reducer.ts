import { Action, createReducer, on } from '@ngrx/store';

import { RecipeStateInterface } from '../../contracts/store/recipes/RecipeStateInterface';
import * as ReciActions from './recipe.actions';

export const initialState: RecipeStateInterface = {
  recipes: [],
};

const _recipeReducer = createReducer(
  initialState,
  on(ReciActions.SetRecipes, (state, { recipes }) => ({
		...state,
		recipes
	})),
  on(ReciActions.AddRecipe, (state, recipe) => ({
		...state,
		recipes: [
			...state.recipes,
			recipe
		]
	})),
  on(ReciActions.UpdateRecipe, (state, { idx, newRecipe }) => {
		const updatedRecipes = [...state.recipes];
		updatedRecipes[idx] = newRecipe;
		return {
			...state,
			recipes: updatedRecipes
		};
	}),
  on(ReciActions.DeleteRecipe, (state, { idx }) => ({
		...state,
		recipes: state.recipes.filter((_, index) => index !== idx)
	}))
);

export function recipeReducer(state: RecipeStateInterface | undefined, action: Action): RecipeStateInterface {
  return _recipeReducer(state, action);
};
