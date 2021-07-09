import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../../contracts/modes/recipe.model';
import { UserMode } from '../../contracts/modes/user-mode/user';
import { RecipeService } from '../internal/recipe.service';
import { AuthenService } from './authen/authen.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private httpCli: HttpClient,
    private recipeService: RecipeService,
    private authServ: AuthenService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpCli.put(
        'https://angu11-intro-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.httpCli.get<Recipe[]>(
        'https://angu11-intro-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
