import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeLast, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppStoreStateInterface } from '../../../contracts/store/AppStoreStateInterface';
import { UserMode } from '../../../contracts/modes/user-mode/user';
import { AuthenService } from '../../external/authen/authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private authServ: AuthenService,
		private router: Router,
		private store: Store<AppStoreStateInterface>
	) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  	// return this.authServ.userWatcher.pipe(
	return this.store.select('AuthReducer').pipe(
  		take(1),
		map(({ user }): UserMode | null => user),
  		map(
  			(user) => !!user ? !!user : this.router.createUrlTree(['/auth'])
  		)
  	)
  }
}
