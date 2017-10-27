import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'reserve-detail',
  templateUrl: 'reserve.html'
})
export class ReserveDetailPage {

	public reserve : any = undefined;
	
  constructor(
      private nav: NavController,
      public navParams: NavParams
  ) {
  	this.reserve = this.navParams.get('reserve'); 
  }

}
