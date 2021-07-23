import { createAction, props } from '@ngrx/store';

import { Recipe } from '../../contracts/modes/recipe.model';
import {
	SET_RECIPES,
	FETCH_RECIPES,
	STORE_RECIPES,
	ADD_RECIPE,
	UPDATE_RECIPE,
	DELETE_RECIPE
} from './../types';

export const SetRecipes = createAction(SET_RECIPES, props<{ recipes: Recipe[] }>());

export const FetchRecipes = createAction(FETCH_RECIPES);

export const StoreRecipes = createAction(STORE_RECIPES);

export const AddRecipe = createAction(ADD_RECIPE, props<Recipe>());

export const UpdateRecipe = createAction(UPDATE_RECIPE, props<{ idx: number, newRecipe: Recipe }>());

export const DeleteRecipe = createAction(DELETE_RECIPE, props<{ idx: number }>());
