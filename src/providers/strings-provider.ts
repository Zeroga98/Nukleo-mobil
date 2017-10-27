import { Injectable } from '@angular/core';

@Injectable()
export class StringsProvider {

	public error_connection: string = "No se puede conectar con el servidor";
	public modal_error_connection: string = "No se pudo conectar con el servidor, verifica la conexión con internet";

  	constructor(){}
}