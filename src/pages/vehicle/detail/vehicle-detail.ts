import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VehicleService } from '../../../services/vehicle-service';
import { VehicleReservePage } from '../reserve/vehicle-reserve';
import { LoginPage } from '../../user/login/login';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth-service'
import { Observable } from 'rxjs/Observable';
import { MQTTService } from '../../../core/mqtt.service'
import {LoggerService} from '../../../core/logger.service';


@Component({
  selector: 'page-vehicleDetailPage',
  templateUrl: 'vehicle-detail.html'
})


export class VehicleDetailPage {

  search: string = "";
  showSearchBar: boolean = false;
  vehicle: any;
  public: any;
  private currentUser: User;
  private isAuthenticated: boolean;
  public status: boolean;
  public isConnected: boolean = false;
    public relay: any = {};


  constructor(
    public mqtt: MQTTService,
    public logger: LoggerService,
    private nav: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    private vehicleService: VehicleService
  ) {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    })

    this.vehicle = this.navParams.get('vehicle');
    this.authService.currentUser.subscribe((userData) => {
      this.currentUser = userData
    })
  }

  ionViewDidLoad() {
    this.detail(); 
  }

  public relay1PowerOnModel(value) {
    console.log(value);
    this.relay.powerOn = value;

    this.mqtt.publish('25bd95c4-484a-11e7-8835-0242ac110002/1000003', value =='open'? '1' : '0', { retain: true, qos: 2 });
  }

  public goToReserve(vehicle: any) {
    if (this.status) {
      if (this.isAuthenticated) {
        this.nav.push(VehicleReservePage, { vehicle: vehicle });
      } else {
        this.nav.push(LoginPage, { vehicle: vehicle });
      }
    }
  }

  public favorite() {
    console.log("favorito!!");
  }

  public detail() {
    this.vehicleService.getDetaild(this.vehicle.id).subscribe(
      vehicle => {
       this.public=vehicle[0];
      console.log(vehicle[0]);
      },
      error => {
        console.log(error);
      }
    );
  }

}
