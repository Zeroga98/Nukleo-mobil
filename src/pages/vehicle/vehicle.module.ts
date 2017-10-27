import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleListPage } from './list/vehicle-list';
import { FavoritePage } from './favorite/favorite';
import { VehicleDetailPage } from './detail/vehicle-detail';
import { VehicleReservePage } from './reserve/vehicle-reserve';
import { ConfirmReservePage } from './confirm_reserve/confirm-reserve';
import { MyReservationsPage } from './my_reservations/my_reservations';
import { OwnCarsPage } from './own-cars/own-cars';
import { SelecDatePage } from './select_date/select_date';
import { NotDataComponent } from '../../components/not-data/not-data';
import { HeaderComponent } from '../../components/header/header';

import { VehicleItemComponent } from './item/vehicle-item';


@NgModule({
	imports: [IonicPageModule],
  	declarations: [
    	VehicleListPage,
		FavoritePage,
    	VehicleItemComponent,
		VehicleDetailPage,
		VehicleReservePage,
		ConfirmReservePage, 
		MyReservationsPage,
		OwnCarsPage,
		NotDataComponent,
		HeaderComponent,
		SelecDatePage	
  	],
  	entryComponents: [
    	VehicleListPage,
		FavoritePage,
    	VehicleItemComponent,
		VehicleDetailPage,
		VehicleReservePage,
		ConfirmReservePage,
		MyReservationsPage,
		OwnCarsPage,
		NotDataComponent,	
		HeaderComponent,			
		SelecDatePage
  	]
})
export class VehicleModule {}