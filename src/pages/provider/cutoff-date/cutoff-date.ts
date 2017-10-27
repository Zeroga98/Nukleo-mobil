import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProviderService } from '../../../services/provider-service';
import { UtilProvider } from '../../../providers/util-provider';
import { ContractDetailPage } from '../../user/contract-detail/contract-detail'

@Component({
	selector: 'page-cutoff-date',
	templateUrl: 'cutoff-date.html'
})
export class CutoffDatePage {

	public next_payment: number = 0;
	public before_payment: number = 0;
	public contracts: any = undefined;

	constructor(
		public providerService: ProviderService,
    	private nav: NavController,
    	public navParams: NavParams,
		public util: UtilProvider
	) {
		this.getContracts();
		//this.getPayment('next', (data) => this.next_payment = parseInt(data.proximo_pago));
		this.getPayment('before', (data) => this.before_payment = parseInt(data.recaudado));
	}

	public getContracts(){
		this.util.loading();
		this.providerService.getContracts().subscribe(
			response => {
				this.contracts = [];
				if(response != undefined && response.length > 0){
					this.contracts = response;
					console.log(this.contracts);
				}
				this.util.loadingDismiss();
			},
			error => {
				this.contracts = [];
				this.util.presentToast(this.util.strings.error_connection);
				this.util.loadingDismiss();
			});
	}

	public getPayment(state: string, callback: any) {
		this.util.loading();
		this.providerService.getPayment(state).subscribe(
			response => {
				if(response != undefined && response.length > 0){
					callback(response[0]);
				}
				this.util.loadingDismiss();
			},
			error => {
				this.util.presentToast(this.util.strings.error_connection);
				this.util.loadingDismiss();
			});
	}

	public goToDetail(contract_id: string) {
    	this.nav.push(ContractDetailPage, { contract_id: contract_id });
  	}
}