import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AlertModalComponent } from '../../shareCompos/alert-modal/alert-modal.component';
import { AlertPlaceholderDirective } from '../../directives/alert/alert-placeholder.directive';
import { DropdownDirective } from '../../directives/dropdown.directive';


@NgModule({
  declarations: [
    AlertModalComponent,
    AlertPlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModalComponent,
    AlertPlaceholderDirective,
    DropdownDirective
  ],
  entryComponents: [
    AlertModalComponent
  ]
})
export class SharedModule { }
