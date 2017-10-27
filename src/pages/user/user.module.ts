import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login/login';
import { SignUpPage } from './signup/signup';
import { ProfilePage } from './profile/profile';
import { ListReservePage } from './list-reserve/list-reserve';
import { ReserveDetailPage } from './reserve-detail/reserve-detail';
//import { CutoffDatePage } from '../provider/cutoff-date/cutoff-date';
import { ContractDetailPage } from './contract-detail/contract-detail';
import { aboutPage } from './about/about';


@NgModule({
	imports: [IonicPageModule],
  	declarations: [
    	LoginPage,
    	SignUpPage,
    	ProfilePage,
		ListReservePage,
		ReserveDetailPage,
		//CutoffDatePage,
		ContractDetailPage,
		aboutPage
		
  	],
  	entryComponents: [
    	LoginPage,
    	SignUpPage,
    	ProfilePage,
		ListReservePage,
		ReserveDetailPage,
		//CutoffDatePage,
		ContractDetailPage,
		aboutPage
  	]
})
export class UserModule {}