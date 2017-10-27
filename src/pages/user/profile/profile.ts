import { Component } from '@angular/core';

import { AuthService } from '../../../services/auth-service'
import { User } from '../../../models/user.model';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  isAuthenticated: boolean;
  currentUser: User;

  constructor( public authService: AuthService) {}


  /** Nav guard de control de acceso a la vista */
  ionViewCanEnter(){

    /** Suscripción al observable que retornará el estado de sesión */
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    })

    /** Retorna true o false de acuerdo al estado de la sesión de usuario */
    return this.isAuthenticated ? true : false;
  }

  ionViewDidLoad() {
    /** Suscripción al observable que retornará los datos del usuario actual */
    this.authService.currentUser.subscribe((userData) => { 
      this.currentUser = userData
    })
  }
  
}