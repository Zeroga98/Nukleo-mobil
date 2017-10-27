import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VehicleService } from '../../../services/vehicle-service';
import { VehicleListPage } from '../list/vehicle-list';
import { UtilProvider } from '../../../providers/util-provider';

@Component({
  selector: 'page-confirm-reserve',
  templateUrl: 'confirm-reserve.html'
})
export class ConfirmReservePage {

  private loading: any;
  public request: any = [];
  public vehicle: any = [];

  constructor(
    private nav: NavController, 
    public navParams: NavParams,
    public vehicleService :VehicleService,
    private util: UtilProvider
  ) {}

  ionViewDidLoad() {
    this.request = this.navParams.get('request');
    this.vehicle = this.navParams.get('vehicle');
  }

  public confirm(){
    this.loading = this.util.loading();
    this.vehicleService.reserveVehicle(this.request).subscribe(response => { 
      if(response[0].status == 'OK'){
        this.nav.setRoot(VehicleListPage);
        this.util.showError('Solicitado', 'Te esperamos en nuestra sucursal.');
      } else {
        this.util.showError('No disponible', response[0].description);
      }
      
      this.loading.dismiss();
    },
    error => {
      this.util.showError('Oops', this.util.strings.modal_error_connection);
      this.loading.dismiss();
    });
  }
}