import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from '../../../services/auth-service';
import { VehicleService } from '../../../services/vehicle-service';
import { ProfilePage } from '../../user/profile/profile';
import { VehicleDetailPage } from '../detail/vehicle-detail';
import { UtilProvider } from '../../../providers/util-provider';
import { MQTTService } from '../../../core/mqtt.service';
import { LoggerService } from '../../../core/logger.service';
import { SelecDatePage } from '../select_date/select_date';



@Component({
  selector: 'page-vehicleListPage',
  templateUrl: 'vehicle-list.html'
})
export class VehicleListPage {

  public vehicles: any = [];
  search: string = "";
  showSearchBar: boolean = false;
  public extended: boolean = true;
  private offset: number = 0;
  private limit: number = 3;
  public not_data: boolean = true;
  public isConnected: boolean = false;
  public relay: any = {};
  public currentUser: any;
  constructor(
    public mqtt: MQTTService,
    public alertCtrl: AlertController,
    public logger: LoggerService,
    private nav: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private vehicleService: VehicleService,
    private util: UtilProvider,
    public modalCtrl: ModalController
  ) {
    this.authService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      this.connect();
      console.log(this.currentUser);
    })

  }

  ionViewDidLoad() {

    this.getVehicleAll();
  }

  /*------------------------------------*\
      $FUNTIONS
  \*------------------------------------*/
  btnSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  private idHigher(array: any) {
    let temp = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i].vehiculo_id > temp) {
        temp = array[i].vehiculo_id;
      }
    }
    return temp;
  }

  /*------------------------------------*\
      $MODAL
  \*------------------------------------*/

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(SelecDatePage, { params: '...' }, { enableBackdropDismiss: true, showBackdrop: true });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }


  /*------------------------------------*\
      $REFRESH
  \*------------------------------------*/
  doRefresh(refresher) {
    this.getVehicleAll();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      if (this.extended) {
        this.vehicleService.getAll().subscribe(
          vehicles => {
            if (this.vehicles.length == 0) {
              this.vehicles = vehicles;
            } else {
              for (let i = 0; i < vehicles.length; i++) {
                this.vehicles.push(vehicles[i]);
              }
            }
            this.offset = this.idHigher(this.vehicles);
            this.extended = (vehicles.length == this.limit);
            console.log(this.vehicles);
          },
          error => {
            console.log(error);
          }
        );
      }

      infiniteScroll.complete();
    }, 1500);
  }

  /*------------------------------------*\
      $PETITION
  \*------------------------------------*/
  public getVehicleAll() {
    if (this.extended) {
      this.util.loading();
      this.vehicleService.getAll().subscribe(
        vehicles => {
          console.log(vehicles);
          if (this.vehicles == undefined) {
            this.not_data = false;
          } else {
            if (this.vehicles.length == 0) {
              this.vehicles = vehicles;
            } else {
              for (let i = 0; i < vehicles.length; i++) {
                this.vehicles.push(vehicles[i]);
              }
            }
          }
          this.offset = this.idHigher(this.vehicles);
          this.extended = (vehicles.length == this.limit);
          this.not_data = true;
          this.util.loadingDismiss();
        },
        error => {
          this.util.showError('Oops', this.util.strings.modal_error_connection);
          this.util.loadingDismiss();
          if (this.vehicles.length <= 0) {
            this.not_data = false;
          }
          console.log(error);
        }
      );
    }
  }

  /*------------------------------------*\
      $NAV.PUSH
  \*------------------------------------*/
  public goToProfile() {
    this.nav.push(ProfilePage);
  }
  public goToDetail(vehicle: any) {
    this.nav.push(VehicleDetailPage, { vehicle: vehicle })
  }


  public connect() {
    this.mqtt.apikey = this.currentUser.id;
      this.mqtt.connect(err => {
        if (err) return;
        this.logger.log(`connect: MQTT connected`);
        this.isConnected = true;
        this.mqtt.subscribe(this.currentUser.id + '/1000003', (topic: string, powerOn: string) => {
          if (this.relay.powerOn !== (powerOn === '1')) {
            this.relay.powerOn = powerOn === '1';
          }
        });
      });
  }

  public presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Escribe el id que se encuentra detras del dispositivo',
      inputs: [
        {
          name: 'id',
          placeholder: 'id'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            let temp = { device: data.id, apikey: this.currentUser.id, latitude: 'asdfdsf', longitude: 'asdaf' };
            this.vehicleService.addDevice(temp).subscribe(
              vehicle => {

                console.log(vehicle);
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }
}