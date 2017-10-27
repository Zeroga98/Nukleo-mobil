import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProviderService } from '../../../services/provider-service';
import { UtilProvider } from '../../../providers/util-provider';

@Component({
  selector: 'page-contract-detail',
  templateUrl: 'contract-detail.html',
})
export class ContractDetailPage {

	public payment: any = undefined;
	public contract_id: string;

  constructor(
    public navCtrl: NavController,
    private providerService: ProviderService,
    public navParams: NavParams,
    private util: UtilProvider
  ) {}

  ionViewDidLoad() {
  	this.contract_id = this.navParams.get('contract_id'); 
  	this.getHistoryPayment();
  }

  public getHistoryPayment(){
  	this.util.loading();
  	this.providerService.getHistoryPayment(this.contract_id)
  	.subscribe(
      data => {
        this.payment = [];
        if (data != undefined) {
          for (let i = 0; i < data.length; i++) {
            this.payment.push(data[i]);
          }
        }
        this.util.loadingDismiss();
      },
      error => {
        this.util.loadingDismiss();
        this.payment = [];
        console.log(error);
      }
    );
  }

}
