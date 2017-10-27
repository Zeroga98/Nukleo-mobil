import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-register-car',
  templateUrl: 'register-car.html',
})
export class RegisterCarPage {

  constructor(
    public navCtrl: NavController
    ) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterCar');
  }

}
