import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VehicleService } from '../../../services/vehicle-service';
import { ProfilePage } from '../../user/profile/profile';
import { ConfirmReservePage } from '../../vehicle/confirm_reserve/confirm-reserve';
import { UtilProvider } from '../../../providers/util-provider';

@Component({
  selector: 'page-reserve',
  templateUrl: 'vehicle-reserve.html',
})
export class VehicleReservePage {

  private loading: any;
  search: string = "";
  showSearchBar: boolean = false;
  vehicle: any;
  public driver: boolean = false;
  public branchs: any;
  public branch_destiny: any;
  sameSite: boolean = false;
  public limitInitDate: any = new Date();
  public dateOut: string = this.sumday(this.limitInitDate, 2).toISOString().substring(0, 10);
  public dateIn: string = this.limitInitDate.toISOString().substring(0, 10);
  public dateOutMin: string = this.sumday(this.limitInitDate, 2).toISOString().substring(0, 10);
  public dateInMin: string = this.limitInitDate.toISOString().substring(0, 10);
  reserveDates: any;
  public validate: boolean;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private vehicleService: VehicleService,
    private util: UtilProvider
  ) {
    console.log(this.dateOut);


  }

  ionViewDidLoad() {
    this.vehicle = this.navParams.get('vehicle');
    this.getBranchs();
    this.getVehicleReserveDates();
  }

  public sumday(date: Date, days: number) {
    let result: Date = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public sumdateout(date: string, days: number) {
    let result: Date = new Date(date);
    result.setDate(result.getDate() + days + 1);
    this.dateOutMin = (new Date(date) > new Date(this.dateOut)) ? result.toISOString().substring(0, 10) : this.dateOutMin;
    this.dateOut = (new Date(date) > new Date(this.dateOut)) ? result.toISOString().substring(0, 10) : this.dateOutMin;
  }


  private getBranchs() {
    this.loading = this.util.loading();
    this.vehicleService.getBranchs().subscribe(response => {
      setTimeout(() => {
        this.branchs = response;
        this.branch_destiny = this.branchs[0].id;
        console.log(response);
        let loadin_dismiss = this.util.loadingDismiss();
      });
    },
      error => {
        this.util.showError('Oops', this.util.strings.modal_error_connection);
        let loadin_dismiss = this.util.loadingDismiss();
      });
  }

  private getVehicleReserveDates() {
    this.loading = this.util.loading();
    this.vehicleService.getVehicleReserveDates(this.vehicle.vehiculo_id).subscribe(response => {
      setTimeout(() => {
        this.reserveDates = response;
        this.verifyDates(this.dateIn, this.dateOut);
        console.log(response);
        let loadin_dismiss = this.util.loadingDismiss();
      });
    },
      error => {
        this.util.showError('Oops', this.util.strings.modal_error_connection);
        let loadin_dismiss = this.util.loadingDismiss();
      });
  }

  public verifyDates(d1: string, d2: string) {
    let date1: any = new Date(d1);
    let date2: any = new Date(d2);
    date1.setDate(date1.getDate() + 1);
    date2.setDate(date2.getDate() + 1);
    for (let i = 0; i < this.reserveDates.length; i++) {
      let daIn: any = new Date(this.reserveDates[i].fecha_inicia_proceso);
      let daOut: any = new Date(this.reserveDates[i].fecha_final_proceso);
      console.log(date1);
      console.log(daOut);
      if (date1 >= daIn && date1 <= daOut || date2 >= daIn && date2 <= daOut) {
        this.validate = true;
        this.util.showError('Lo sentimos', 'Este vehiculo ya esta reservado para esta fecha.');
        break;
      } else {
        this.validate = false;
      }
    }
  }

  btnSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  public goToProfile() {
    this.nav.push(ProfilePage)
  }

  public goConfirm() {
    let request =
      {
        fecha_inicio: this.dateIn,
        fecha_fin: this.dateOut,
        sucursal_entrega: this.branch_destiny + '',
        vehiculo_id: this.vehicle.vehiculo_id + '',
        sucursal_id: this.vehicle.sucursal_id + '',
        conductor: (this.driver ? '1' : '0')
      };
    this.nav.push(ConfirmReservePage, { request: request, vehicle: this.vehicle })
  }
}
