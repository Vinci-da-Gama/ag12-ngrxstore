import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UserMode } from '../../contracts/modes/user-mode/user';
import { AppStoreStateInterface } from '../../contracts/store/AppStoreStateInterface';
import { DataStorageService } from '../../services/external/data-storage.service';
import { AuthenService } from '../../services/external/authen/authen.service';

@Component({
  selector: 'ngrxstore-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthened: boolean = false;
  private useSub!: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authServ: AuthenService,
    private store: Store<AppStoreStateInterface>
  ) { }

  ngOnInit(): void {
    this.useSub = this.store.select('AuthReducer')
      .pipe(map(({ user }): UserMode | null => user))
      .subscribe((user) => {
        this.isAuthened = !!user;
        console.log('30 -- is User authend? ', this.isAuthened)
      })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout = () => {
    this.authServ.logout();
  }

  ngOnDestroy(): void {
    this.useSub && this.useSub.unsubscribe();
  }
}
