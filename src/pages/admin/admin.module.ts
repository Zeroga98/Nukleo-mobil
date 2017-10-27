import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserListPage } from './user-list/user-list';
import { ReserveListPage } from './reserve-list/reserve-list';
import { NotDataComponent } from '../../components/not-data/not-data';

@NgModule({
	imports: [IonicPageModule],
  	declarations: [
		ReserveListPage,
		UserListPage,
		//NotDataComponent
  	],
  	entryComponents: [    
		ReserveListPage,
		UserListPage,
		//NotDataComponent
  	]
})
export class AdminModule {}
