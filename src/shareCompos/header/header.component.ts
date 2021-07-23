import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UserMode } from '../../contracts/modes/user-mode/user';
import { AppStoreStateInterface } from '../../contracts/store/AppStoreStateInterface';
// import { DataStorageService } from '../../services/external/data-storage.service';
import { AuthenService } from '../../services/external/authen/authen.service';
import { Logout } from '../../store/authStore/auth.actions';
import { FetchRecipes, StoreRecipes } from '../../store/recipeStore/recipe.actions';

@Component({
  selector: 'ngrxstore-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthened: boolean = false;
  private useSub!: Subscription;

  constructor(
    /* private dataStorageService: DataStorageService,
    private authServ: AuthenService, */
    private store: Store<AppStoreStateInterface>
  ) { }

  ngOnInit(): void {
    this.useSub = this.store.select('AuthReducer')
      .pipe(map(({ user }): UserMode | null => user))
      .subscribe((user) => {
        this.isAuthened = !!user;
        console.log('32 -- is User authend? ', this.isAuthened)
      })
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(FetchRecipes());
  }

  onLogout = () => {
    // this.authServ.logout();
    this.store.dispatch(Logout());
  }

  ngOnDestroy(): void {
    this.useSub && this.useSub.unsubscribe();
  }
}
