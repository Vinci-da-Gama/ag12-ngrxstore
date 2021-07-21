import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment'; // Angular CLI environment
import { AppComponent } from './app.component';
/* import { RecipesModule } from '../modules/recipes/recipes.module';
import { ShoppinglistModule } from '../modules/shoppinglist/shoppinglist.module'; */
import { SharedModule } from '../modules/share/shared.module';
import { CoreModule } from '../modules/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from '../shareCompos/header/header.component';
import { NoFoundComponent } from '../shareCompos/no-found/no-found.component';

import { reducers } from '../store/appStore/app.reducers';
import { AuthEffects } from '../store/authStore/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ AuthEffects ]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      features: {
        pause: false, // start/pause recording of dispatched actions
        lock: true, // lock/unlock dispatching actions and side effects
        persist: true // persist states on page reloading
      }
    }),
    /* RecipesModule,
    ShoppinglistModule, */
    SharedModule,
    CoreModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
