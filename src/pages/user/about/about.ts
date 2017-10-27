import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth-service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class aboutPage {

  
  private currentUser: User;
  Credentials = {email: '', password: ''};

  constructor(
      private nav: NavController, 
      private authService: AuthService
  ) {

    this.authService.currentUser.subscribe((userData) => { 
      this.currentUser = userData;
    });
  }
 



}