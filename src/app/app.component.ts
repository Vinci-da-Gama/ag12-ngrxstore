import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import { Store } from '@ngrx/store';

import { AppStoreStateInterface } from '../contracts/store/AppStoreStateInterface';
import { AuthenService } from '../services/external/authen/authen.service';
import { AutoLogin } from '../store/authStore/auth.actions';

@Component({
  selector: 'ngrxstore-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
  	private authServ: AuthenService,
    private store: Store<AppStoreStateInterface>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
  	// this.authServ.autoLogin()
    if (isPlatformBrowser(this.platformId)) {
      // only the platform is browser, then use autoLogin, due to it has LocalStorage;
      // localStorage is the browser only
      this.store.dispatch(AutoLogin());
    }
  }
}
