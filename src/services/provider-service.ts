import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api-service';

@Injectable()
export class ProviderService {

  constructor(public apiService: ApiService) {
  }

  public getPayment(state: string) {
  	 return this.apiService.get('/paysheet/payment?type=' + state)
    .map(
      data => {
        return data;
    })
  }

  public getHistoryPayment(contract_id: string) {
  	 return this.apiService.get('/paysheet/history-payment?contract_id=' + contract_id)
    .map(
      data => {
        return data;
    })
  }

  public getContracts(){
    return this.apiService.get('/provider/contracts')
    .map(
      data => {
        return data;
    })
  }

}
