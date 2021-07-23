import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { AppStoreStateInterface } from '../../contracts/store/AppStoreStateInterface';
import { Recipe } from '../../contracts/modes/recipe.model';
import {
	FETCH_RECIPES,
	STORE_RECIPES
} from '../types';
import {
	SetRecipes
} from './recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
		private httpCli: HttpClient,
    private store: Store<AppStoreStateInterface>
  ) {}

	fetchRecipes$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(FETCH_RECIPES),
			switchMap(() => {
				return this.httpCli.get<Recipe[]>(
					'https://angu11-intro-default-rtdb.firebaseio.com/recipes.json'
				);
			}),
			map((recipes) => {
				const reformatedRecipes: Recipe[] = recipes.map((recipe) => ({
					...recipe,
					ingredients: recipe.ingredients ? recipe.ingredients : []
				}));
				return SetRecipes({recipes: reformatedRecipes});
			})
		);
	});

	storeRecipes$: Observable<Action> = createEffect(() => this.actions$.pipe(
		ofType(STORE_RECIPES),
		withLatestFrom(this.store.select('recipeReducer')),
		// [{ type: string }, { recipes: Recipe[] }]
		switchMap(([ actionTypeString, { recipes } ]) => {
			return this.httpCli.put<any>(
				'https://angu11-intro-default-rtdb.firebaseio.com/recipes.json',
				recipes
			)
		})
	));

}
