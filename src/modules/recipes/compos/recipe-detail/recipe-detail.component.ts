import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../../../../contracts/modes/recipe.model';
import { AppStoreStateInterface } from '../../../../contracts/store/AppStoreStateInterface';
// import { RecipeService } from '../../../../services/internal/recipe.service';
import { AddIngredients } from '../../../../store/slStore/sl.actions';
import { DeleteRecipe } from '../../../../store/recipeStore/recipe.actions';

@Component({
  selector: 'ngrxstore-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe!: Recipe;
  id!: number;
  targetRecipeSub!: Subscription;

  constructor(
    // private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStoreStateInterface>
  ) {}

  ngOnInit() {
    /* this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      ); */
    this.targetRecipeSub = this.route.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id: number) => {
          this.id = id;
          return this.store.select('recipeReducer');
        }),
        map(({ recipes }) => {
          /* const recipe = recipes.find((_, idx) => idx === this.id);
          return recipe ? recipe : new Recipe('', '', '', []); */
          return recipes.find((_, idx) => idx === this.id);
        })
      )
      .subscribe((recipe: any) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    // shopping list aciton is still old way -- the class Action way...
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {
      relativeTo: this.route
    });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(DeleteRecipe({ idx: this.id }));
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(): void {
    this.targetRecipeSub && this.targetRecipeSub.unsubscribe();
  }

}
