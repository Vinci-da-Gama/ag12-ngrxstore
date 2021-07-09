import { Component, OnInit } from '@angular/core';

import { AuthenService } from '../services/external/authen/authen.service';

@Component({
  selector: 'ngrxstore-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
  	private authServ: AuthenService
  ) { }

  ngOnInit(): void {
  	this.authServ.autoLogin()
  }
}
