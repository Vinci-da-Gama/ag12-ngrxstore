import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { ShoppingListService } from '../../services/internal/shopping-list.service';
import { AuthInterceptor } from './../../services/interceptors/auth/auth-interceptor.interceptor';

@NgModule({
  providers: [
    // ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
