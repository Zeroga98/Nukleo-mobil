import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../services/auth-service';
import { VehicleService } from '../../../services/vehicle-service';
import { ProfilePage } from '../../user/profile/profile';
import { VehicleDetailPage } from '../detail/vehicle-detail';
import { UtilProvider } from '../../../providers/util-provider';
import { SelecDatePage } from '../select_date/select_date';


@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html'
})
export class FavoritePage {

  public vehicles: any = undefined;
  public favorito: number = null;

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

  /*------------------------------------*\
    $FUNTIONS
  \*------------------------------------*/

  public favorite() {
    if (this.favorito == null) {
      this.favorito = 1;
    } else {
      this.favorito = null;
    }
  }

  removeFavorite(vehicle: any, index: number) {
    let vehicle_id: any = {
      vehiculo_id: vehicle.vehiculo_id,
      state: "delete"
    };
    this.vehicleService.addVehicleFavorites(vehicle_id).subscribe(
      response => {
        this.vehicles.splice(index, 1);
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }


  /*------------------------------------*\
    $PETITION
  \*------------------------------------*/
  public getVehicleAll() {
    this.util.loading();
    this.vehicleService.getVehicleFavorites().subscribe(
      vehicles => {
        this.vehicles = [];
        //console.log(vehicles);
        this.vehicles = vehicles
        this.util.loadingDismiss();
      },
      error => {
        this.util.showError('Oops', this.util.strings.modal_error_connection);
        this.util.loadingDismiss();
        console.log(error);
      }
    );
  }

  /*------------------------------------*\
    $NAV.PUSH
  \*------------------------------------*/

  public goToDetail(vehicle: any) {
    this.nav.push(VehicleDetailPage, { vehicle: vehicle })
  }


}