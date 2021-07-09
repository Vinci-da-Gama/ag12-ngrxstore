// import { Action } from '@ngrx/store';

import * as ActionTypes from '../types';
import {
  Ingredient
} from '../../contracts/modes/ingredient.model';
import {
  ShoppingListStateInterface
} from '../../contracts/store/sl/ShoppingListStateInterface';
import * as ShoppingListActions from './sl.actions';

const slInitState: ShoppingListStateInterface = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
	editedIngredient: {
    name: '',
    amount: -1
  },
	editedIngredientIndex: -1
};

export default (state = slInitState, { type, payload }: ShoppingListActions.SlActionType): ShoppingListStateInterface => {
  switch (type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [ ...state.ingredients, payload as Ingredient ]
      }
    case ActionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...payload as Ingredient[]]
      }
    case ActionTypes.UPDATE_INGREDIENT:
      const existIngredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...existIngredient,
        ...payload as Ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients,
        editedIngredient: {
          name: '',
          amount: -1
        },
        editedIngredientIndex: -1
      };
    case ActionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_, idx) => idx !== state.editedIngredientIndex),
        editedIngredient: {
          name: '',
          amount: -1
        },
        editedIngredientIndex: -1
      }
    case ActionTypes.START_EDIT_INGREDIENT:
      return {
        ...state,
        editedIngredient: state.ingredients[payload as number],
        editedIngredientIndex:  payload as number
      }
    case ActionTypes.STOP_EDIT_INGREDIENT:
      return {
        ...state,
        editedIngredient: {
          name: '',
          amount: -1
        },
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
};
