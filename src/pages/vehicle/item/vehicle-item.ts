import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VehicleDetailPage } from '../detail/vehicle-detail';
import { VehicleService } from '../../../services/vehicle-service';

@Component({
  selector: 'vehicle-item',
  templateUrl: 'vehicle-item.html'
})

export class VehicleItemComponent {

  @Input() alquilado: number;
  @Input() auto_nombre: string;
  @Input() descripcion: string;
  @Input() favorito: number;
  @Input() foto_url: string;
  @Input() marca_nombre: string;
  @Input() modelo: string;
  @Input() precio_dia: string;
  @Input() puertas: number;
  @Input() puestos: number;
  @Input() sucursal: string;
  @Input() sucursal_municipio: string;
  @Input() tipo_combustible: string;
  @Input() tipo_transmicion: string;
  @Input() vehiculo_id: number;
  @Input() vehicle: any;

  constructor(
    private nav: NavController,
    private vehicleService: VehicleService
  ) { }
  
  public favorite() {
    if (this.favorito == null) {
      this.favorito = 1;
    } else {
      this.favorito = null;
    }
  }

  public goToDetail() {
    this.nav.push(VehicleDetailPage, { vehicle: this.vehicle })
  }

  addVehicleFavorites() {
    let state: string = (this.favorito != null) ? "delete" : "add";
    let vehicle_id: any = {
      vehiculo_id: this.vehiculo_id,
      state: state
    };
    console.log(vehicle_id);
    this.vehicleService.addVehicleFavorites(vehicle_id).subscribe(
      response => {
        this.favorite();
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

  }
}