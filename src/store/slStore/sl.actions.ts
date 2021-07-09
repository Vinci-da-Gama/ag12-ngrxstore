import {
  /*  createAction, */
  Action
} from '@ngrx/store';

import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
	START_EDIT_INGREDIENT,
	STOP_EDIT_INGREDIENT
} from '../types';
import {
  Ingredient
} from '../../contracts/modes/ingredient.model';

// export const AddIngredient = createAction(ADD_INGREDIENT);

export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;
  constructor(
    public payload: Ingredient
  ) {}
};

export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;
  constructor(
    public payload: Ingredient[]
  ) {}
};

export class UpdateIngredient implements Action {
  readonly type: string = UPDATE_INGREDIENT;
  constructor(
    public payload: Ingredient
  ) {}
};

export class DeleteIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;
};

export class StartEditIngredient implements Action {
  readonly type: string = START_EDIT_INGREDIENT;
  constructor(
    public payload: number
  ) {}
};

export class StopEditIngredient implements Action {
  readonly type: string = STOP_EDIT_INGREDIENT;
};

export type SlActionType = AddIngredient
	| AddIngredients
	| UpdateIngredient
	// | DeleteIngredient
	| StartEditIngredient;
	// | StopEditIngredient;
