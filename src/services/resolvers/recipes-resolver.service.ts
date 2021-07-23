import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

import { AppStoreStateInterface } from '../../contracts/store/AppStoreStateInterface';
import { Recipe } from '../../contracts/modes/recipe.model';
/* import { DataStorageService } from '../external/data-storage.service';
import { RecipeService } from '../internal/recipe.service'; */
import { SET_RECIPES } from '../../store/types';
import { FetchRecipes } from '../../store/recipeStore/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    /* private dataStorageService: DataStorageService,
    private recipesService: RecipeService, */
    private actions$: Actions,
    private store: Store<AppStoreStateInterface>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /* const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    } */
    return this.store.select('recipeReducer').pipe(
      take(1),
      map(({ recipes }) => recipes),
      switchMap((recipes) => {
        if (!recipes || recipes.length <= 0) {
          this.store.dispatch(FetchRecipes());
          return this.actions$.pipe(
            ofType(SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
