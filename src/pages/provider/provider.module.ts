import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CutoffDatePage } from './cutoff-date/cutoff-date';


@NgModule({
	imports: [IonicPageModule],
  	declarations: [
		CutoffDatePage
  	],
  	entryComponents: [    
		CutoffDatePage
  	]
})
export class ProviderModule {}