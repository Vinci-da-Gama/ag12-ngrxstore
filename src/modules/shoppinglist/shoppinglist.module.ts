import { NgModule } from '@angular/core';

import { ShoppinglistRoutingModule } from './shoppinglist-routing.module';
import { SharedModule } from '../share/shared.module';
import { ShoppingEditComponent } from './compos/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './sl-layout/shopping-list.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    ShoppinglistRoutingModule,
    SharedModule
  ]
})
export class ShoppinglistModule { }
