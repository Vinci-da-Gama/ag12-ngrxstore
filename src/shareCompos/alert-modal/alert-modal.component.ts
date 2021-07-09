import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngrxstore-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
	@Input('message') msg: string = '';
	@Output('closeAlert') closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onClose = () => {
  	this.closeModal.emit();
  }

}
