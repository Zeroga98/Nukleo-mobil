import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api-service';

@Injectable()
export class UserService {

  constructor(public apiService: ApiService) {
  }

/*  public getUser() {
    return this.apiService.get('/user/get-rol')
      .map(
      data => {
        return data;
      });
  }
*/
  public getReserveClient(history: string) {
    return this.apiService.get('/reserve/get-reserve-client?history=' + history)
      .map(
      data => {
        return data;
      });
  }

  public getListUsers() {
    return this.apiService.get('/user/get-users')
      .map(
      data => {
        return data;
      });
  }

  public getAllRols(){
    return this.apiService.get('/user/get-all-rols')
      .map(
      data => {
        return data;
      });
  }

  public changeStateUser(data: any){
    return this.apiService.post('/user/change-state', data)
      .map(
      data => {
        return data;
      });
  }

  public changeRolsUser(data: any){
    return this.apiService.post('/user/change-rols', data)
      .map(
      data => {
        return data;
      });
  }

  public getAllReserve(data: any){
    return this.apiService.get('/reserve/get-all-reserve', data)
      .map(
      data => {
        return data;
      });
  }

}
