import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { VehicleListPage } from '../pages/vehicle/list/vehicle-list';
import { FavoritePage } from '../pages/vehicle/favorite/favorite';
import { MyReservationsPage } from '../pages/vehicle/my_reservations/my_reservations';
import { MenuService } from '../services/menu-service';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { LoginPage } from '../pages/user/login/login';

import { User } from '../models/user.model';

@Component({
  templateUrl: 'app.html'
})

export class Road {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array <any>;
  currentUser: User;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public platform: Platform,
    public menuService: MenuService,
    public appCtrl: App,
  ){
      /*this.getUserProfile();*/
      this.initializeApp();
  }

  initializeApp() {
    this.authService.populate();
    this.pages = this.menuService.getMenu();
    this.platform.ready().then(() => {
      StatusBar.overlaysWebView(true);
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString('#D32E2E');
      Splashscreen.hide();
    });
    this.authService.currentUser.subscribe((userData) => { 
      this.currentUser = userData;
    });
  }

  openPage(page) {
    console.log(page);
      this.appCtrl.getRootNav().setRoot(page.component).catch(err => {
        console.log(err);
        this.appCtrl.getRootNav().setRoot(LoginPage);
      });
  } 

 /* private getUserProfile(){
    this.userService.getUser().subscribe(
        data => {
          console.log(data);
          if(data != undefined && data[0].status != 'ERROR'){
            this.menuService.configMenu(data[0].rol_nombre);
            this.currentUser.foto = data[0].foto;
            this.currentUser.genero = data[0].genero;
            this.currentUser.lastname = data[0].lastname;
            this.currentUser.celular = data[0].celular;
            this.currentUser.rol_nombre = data[0].rol_nombre;
            this.currentUser.tipo = data[0].tipo;
            this.authService.setCurrentUser(this.currentUser);
            
          } else if(data[0].type == 'token_null'){
            console.log("No esta logeado");
          }
        },
        error => {
          console.log(error);
        }
      );
  }*/
}

