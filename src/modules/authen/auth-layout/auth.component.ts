import { Component, ViewChild, OnDestroy, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { AuthenService } from '../../../services/external/authen/authen.service';
import { AuthStateInterface } from '../../../contracts/store/auth/AuthStateInterface';
import { AppStoreStateInterface } from '../../../contracts/store/AppStoreStateInterface';
import { AuthenRespInterface } from '../../../contracts/interfaces/authen/authen-resp';
import { AlertModalComponent } from '../../../shareCompos/alert-modal/alert-modal.component';
import { AlertPlaceholderDirective } from '../../../directives/alert/alert-placeholder.directive';
import { LoginStart, SignupStart, AuthenticateSuccess, ClearError, Logout } from '../../../store/authStore/auth.actions';

@Component({
  selector: 'ngrxstore-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') slAuthForm!: NgForm;
  isLoginMode: boolean = false;
  // private authSub!: Subscription;
  private storeSub!: Subscription;
  private closeModalSub!: Subscription;
  isLoading: boolean = false;
  error: string | null = null;
  @ViewChild(AlertPlaceholderDirective) alertHost!: AlertPlaceholderDirective;

  constructor(
    private authServ: AuthenService,
    private router: Router,
    private compoFactRver: ComponentFactoryResolver,
    private store: Store<AppStoreStateInterface>
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('AuthReducer').subscribe((authState: AuthStateInterface) => {
      const { loading, authError } = authState;

      this.isLoading = loading;
      this.error = authError;
      if (this.error) {
        this.showErrorMsg(this.error);
      }

    })
  }

  onSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit = (/*form: NgForm*/) => {
    const { value } = this.slAuthForm;
    this.isLoading = true;
    if (this.slAuthForm.invalid) {
      this.isLoading = false;
      return;
    }

    let authObs: Observable<AuthenRespInterface>;
    if (this.isLoginMode) {
      // authObs = this.authServ.login(value);
      // this.isLoading = false;
      this.store.dispatch(LoginStart({ ...value }));
    } else {
      // authObs = this.authServ.signup(value);
      // this.isLoading = false;
      this.store.dispatch(SignupStart({ ...value }));
    }
    /* this.authSub = authObs!.subscribe((resp: AuthenRespInterface) => {
      console.log('72 -- resp: ', resp)
      this.error = null;
      this.router.navigate(['/recipes']);
      this.slAuthForm.reset();
    }, (errMsg) => {
      console.log('77 -- errMsg: ', errMsg)
      this.error = errMsg;
      this.showErrorMsg(errMsg)
    }); */

  }

  clearErrorToCloseModal = () => {
    this.error = null;
  }

  private showErrorMsg = (msg: string) => {
    const alertCompoFactory = this.compoFactRver.resolveComponentFactory(AlertModalComponent);
    const hostViewContainerRef = this.alertHost.vcRef;
    hostViewContainerRef.clear();

    const compoRef = hostViewContainerRef.createComponent(alertCompoFactory);

    /* pass message, and then close modal */
    compoRef.instance.msg = msg;
    this.closeModalSub = compoRef.instance.closeModal.subscribe(() => {
      this.closeModalSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  // this one looks like useless...
  onHandleError() {
    this.store.dispatch(ClearError());
  }

  ngOnDestroy(): void {
    // this.authSub && this.authSub.unsubscribe();
    this.closeModalSub && this.closeModalSub.unsubscribe();
    this.storeSub && this.storeSub.unsubscribe();
  }

}
