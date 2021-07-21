import { Component, OnInit } from '@angular/core';
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
    private store: Store<AppStoreStateInterface>
  ) { }

  ngOnInit(): void {
  	// this.authServ.autoLogin()
    this.store.dispatch(AutoLogin());
  }
}
