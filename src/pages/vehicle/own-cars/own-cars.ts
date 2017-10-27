import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../services/auth-service';
import { VehicleService } from '../../../services/vehicle-service';
import { ContractDetailPage } from '../../user/contract-detail/contract-detail';
import { UtilProvider } from '../../../providers/util-provider';

@Component({
  selector: 'page-own-cars',
  templateUrl: 'own-cars.html',
})

export class OwnCarsPage { 
  public vehicles: any = undefined;
  public title: string = "Mis vehiculos";

  constructor(
    private nav: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private vehicleService: VehicleService,
    private util: UtilProvider
  ) { }

  ionViewDidLoad() {
    this.getVehicleAll();
  }

  public getVehicleAll() {
    this.util.loading();
    this.vehicleService.getVehiclesProvider().subscribe(
      vehicles => {
        this.vehicles = [];
        if (vehicles != undefined) {
          for (let i = 0; i < vehicles.length; i++) {
            this.vehicles.push(vehicles[i]);
          }
          console.log(this.vehicles);
        }
        this.util.loadingDismiss();
      },
      error => {
        this.util.loadingDismiss();
        this.vehicles = [];
        console.log(error);
      }
    );
  }

  public goToDetail(contract_id){
    this.nav.push(ContractDetailPage, {contract_id: contract_id});
  }

}
