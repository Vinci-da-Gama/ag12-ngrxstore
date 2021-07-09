import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler,
  HttpEvent, HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../../../contracts/modes/recipe.model';
import { AppStoreStateInterface } from '../../../contracts/store/AppStoreStateInterface';
import { UserMode } from '../../../contracts/modes/user-mode/user';
import { AuthenService } from '../../external/authen/authen.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authServ: AuthenService,
    private store: Store<AppStoreStateInterface>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // return this.authServ.userWatcher.pipe(
    return this.store.select('AuthReducer').pipe(
      take(1),
      map(({ user }): UserMode | null => user),
      exhaustMap((user: UserMode | null): any => {
        if (!user) {
          return next.handle(request);
        }
        const hasUserTokenReq = request.clone({
          params: new HttpParams().set('auth', String(user.token))
        });
        return next.handle(hasUserTokenReq);
      })
    )
  }
}
