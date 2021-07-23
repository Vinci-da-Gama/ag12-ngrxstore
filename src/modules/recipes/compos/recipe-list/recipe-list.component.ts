import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../../../../contracts/modes/recipe.model';
import { AppStoreStateInterface } from '../../../../contracts/store/AppStoreStateInterface';
// import { RecipeService } from '../../../../services/internal/recipe.service';

@Component({
  selector: 'ngrxstore-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription!: Subscription;

  constructor(
    // private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store <AppStoreStateInterface>
  ) {}

  ngOnInit() {
    /* this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes(); */
    this.subscription = this.store
      .select('recipeReducer').pipe(map(({ recipes }) => recipes))
      .subscribe((recipes: Recipe[]) => { this.recipes = recipes });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {
      relativeTo: this.route
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
