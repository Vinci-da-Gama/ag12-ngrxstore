import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../../contracts/modes/ingredient.model';
import { AppStoreStateInterface } from '../../../contracts/store/AppStoreStateInterface'
// import { ShoppingListService } from '../../../services/internal/shopping-list.service';
import * as SlActions from '../../../store/slStore/sl.actions';

@Component({
  selector: 'ngrxstore-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients!: Ingredient[];
  ingredients!: Observable<{ ingredients: Ingredient[] }>;
  // private subscription!: Subscription;

  constructor(
    // private slService: ShoppingListService,
    private store: Store<AppStoreStateInterface>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingListReducer');
    /* this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      ); */
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch( new SlActions.StartEditIngredient(index) );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
