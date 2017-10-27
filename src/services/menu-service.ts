import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ApiService } from './api-service';

//Pages
import { VehicleListPage } from '../pages/vehicle/list/vehicle-list';
import { FavoritePage } from '../pages/vehicle/favorite/favorite';
import { MyReservationsPage } from '../pages/vehicle/my_reservations/my_reservations';
import { ProfilePage } from '../pages/user/profile/profile';
import { CutoffDatePage } from '../pages/provider/cutoff-date/cutoff-date';
import { OwnCarsPage } from '../pages/vehicle/own-cars/own-cars';
import { aboutPage } from '../pages/user/about/about';
import { RegisterCarPage } from '../pages/employee/register-car/register-car';
import { UserListPage } from '../pages/admin/user-list/user-list';
import { ReserveListPage } from '../pages/admin/reserve-list/reserve-list';

@Injectable()
export class MenuService {

  pages: Array<{ title: string, component: any, icon: string, access: string }>;

  constructor(public apiService: ApiService) {
    this.pages = [
      { title: 'Tus dispositivos', component: VehicleListPage, icon: 'car', access: 'public' },
      { title: 'Mi cuenta', component: ProfilePage, icon: 'person', access: 'public' }
    ];
  }

  public getMenu() {
    return this.pages;
  }

  public configMenu(rol: string) {
    let rols = rol.split("-");
    for (var i = 0; i < rols.length; ++i) {
      if (rols[i] == 'cliente') {
        this.rolClient();
      } else if (rols[i] == 'admin') {
        this.rolAdmin();
      } else if (rols[i] == 'proveedor') {
        this.rolProvider();
      } else if (rols[i] == 'empleado') {
        this.rolEmployee();
      }
    }
    
    for (var i = 0; i < this.pages.length; i++) {
      let temp = this.pages[i];
        for (var j = i+1; j < this.pages.length; j++) {    
          if (temp.title===this.pages[j].title) {
            this.pages.splice(j,j+1);
          }
        }
      
    }
       this.pages.push(
      { title: 'Acerca de', component: aboutPage, icon: 'ios-information-circle-outline', access: 'client' }
    );
  }

  public resetMenu() {
    let i = 0;
    while (i < this.pages.length) {
      if (this.pages[i].access != 'public') {
        this.pages.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  private rolClient() {
    this.pages.push({ title: 'Mis reservas', component: MyReservationsPage, icon: 'ios-cart-outline', access: 'client' });
    this.pages.push({ title: 'Favoritos', component: FavoritePage, icon: 'star-outline', access: 'client' });
  }

  private rolAdmin() {    
    this.pages.push({ title: 'Lista de usuarios', component: UserListPage, icon: 'contacts', access: 'admin' });
    this.pages.push({ title: 'Lista de reservas', component: ReserveListPage, icon: 'md-bookmarks', access: 'admin' });
    this.pages.push({ title: 'Crear usuario', component: VehicleListPage, icon: 'ios-contacts-outline', access: 'admin' });
  }

  private rolProvider() {
    this.pages.push({ title: 'Contratos', component: CutoffDatePage, icon: 'ios-podium-outline', access: 'provider' });
    this.pages.push({ title: 'Mis vehículos', component: OwnCarsPage, icon: 'logo-buffer', access: 'provider' });
  }

  private rolEmployee() {
    this.pages.push({ title: 'Crear usuario', component: VehicleListPage, icon: 'ios-contacts-outline', access: 'employee' });
    this.pages.push({ title: 'Lista de usuarios', component: UserListPage, icon: 'contacts', access: 'employee' });
    this.pages.push({ title: 'Lista de reservas', component: ReserveListPage, icon: 'md-bookmarks', access: 'employee' });
    this.pages.push({ title: 'Contratos', component: CutoffDatePage, icon: 'ios-podium-outline', access: 'employee' });
  }
}
