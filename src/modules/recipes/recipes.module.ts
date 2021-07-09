import { NgModule } from '@angular/core';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from './../share/shared.module';
import { RecipeLayoutComponent } from './recipe-layout/recipes-layout.component';
import { RecipeListComponent } from './compos/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './compos/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './compos/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './compos/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './compos/recipe-list/recipe-item/recipe-item.component';


@NgModule({
  declarations: [
    RecipeLayoutComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
