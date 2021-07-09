import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NoFoundComponent } from '../shareCompos/no-found/no-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () => import('../modules/recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('../modules/shoppinglist/shoppinglist.module').then(m => m.ShoppinglistModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../modules/authen/authen.module').then(m => m.AuthenModule)
  },
  {
    path: 'no-found',
    component: NoFoundComponent,
    data: {
      message: 'Message From Route Data -- Page not found.'
    }
  },
  {
    path: '**',
    redirectTo: '/no-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
