import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../../pages/user/profile/profile';


@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() title: any;
  search: string = "";
  showSearchBar: boolean = false;

  constructor(
    private nav: NavController,
  ) {
  }

  public goToProfile() {
    this.nav.push(ProfilePage)
  }

  btnSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

}
