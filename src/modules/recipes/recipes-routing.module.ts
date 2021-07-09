import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeLayoutComponent } from './recipe-layout/recipes-layout.component';
import { RecipeDetailComponent } from './compos/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './compos/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './compos/recipe-edit/recipe-edit.component';
import { AuthGuard } from '../../services/guards/auth/auth.guard';
import { RecipesResolverService } from '../../services/resolvers/recipes-resolver.service';

const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
