import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api-service';

import { Vehicle } from '../models/vehicle.model'

@Injectable()
export class VehicleService {

  constructor( public apiService: ApiService ) {
    this.apiService;
  }

  public getAll(): Observable<Vehicle[]> {
    return this.apiService.get('/customer/devices')
    .map(
      data => {
        return data;
    })
  }
    public addDevice(vehicle: any): Observable<Vehicle[]> {
    return this.apiService.post('/pair',vehicle)
    .map(
      data => {
        return data;
    })
  }


   public getDetaild(vehicle_id: number): Observable<any> {
    return this.apiService.get('/customer/device/' + vehicle_id)
    .map(
      data => {
        return data;
    })
  }
//Lista las sucursales disponibles
   public getBranchs(): Observable<any> {
    return this.apiService.get('/branch/all?empresa_id=1')
    .map(
      data => {
        return data;
    })
  }
//Lista las sucursales disponibles
   public getVehicleReserveDates(vehicle_id: number): Observable<any> {
    return this.apiService.get('/vehicle/reserve?vehicle_id=' + vehicle_id)
    .map(
      data => {
        return data;
    })
  }

  //Añadir vehiculo a favoritos
   public addVehicleFavorites(vehicle_id: number): Observable<any> {
    return this.apiService.post('/favorite/user-add', vehicle_id )
    .map(
      data => {
        return data;
    })
  }

  public getVehicleFavorites(): Observable<any> {
    return this.apiService.get('/favorite/user-favorites/')
    .map(
      data => {
        return data;
    })
  }

  public getVehiclesProvider(): Observable<any> {
    return this.apiService.get('/provider/get-vehicles/')
    .map(
      data => {
        return data;
    })
  }

  public reserveVehicle(reserve: any): Observable<any> {
    return this.apiService.post('/reserve/pre', reserve)
    .map(
      data => {
        return data;
    })
  }
}