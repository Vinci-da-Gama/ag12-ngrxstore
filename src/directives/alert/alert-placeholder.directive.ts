import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngrxstoreAlertPlaceholder]'
})
export class AlertPlaceholderDirective {

  constructor(
  	public vcRef: ViewContainerRef
  ) { }

}
