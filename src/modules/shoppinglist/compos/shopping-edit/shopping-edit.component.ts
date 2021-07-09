import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store, Action } from '@ngrx/store';

import { Ingredient } from '../../../../contracts/modes/ingredient.model';
import { AppStoreStateInterface } from '../../../../contracts/store/AppStoreStateInterface'
import * as SlActions from '../../../../store/slStore/sl.actions';

@Component({
  selector: 'ngrxstore-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  // editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(
    private store: Store<AppStoreStateInterface>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingListReducer').subscribe((state) => {
      if (state.editedIngredientIndex > -1) {
        // this.editedItemIndex = index;
        // this.editedItemIndex = state.editedIngredientIndex;
        this.editMode = true;
        // this.editedItem = this.slService.getIngredient(index);
        this.editedItem = state.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    })
    /* this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      ); */
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new SlActions.UpdateIngredient(newIngredient))
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new SlActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new SlActions.StopEditIngredient());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new SlActions.DeleteIngredient()
    )
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new SlActions.StopEditIngredient());
  }

}
