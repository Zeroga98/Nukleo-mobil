import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { ENV } from '@app/config';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TokenService } from './token-service';
import {   Platform } from 'ionic-angular'; 
import { UtilProvider } from '../providers/util-provider';
import { Network } from '@ionic-native/network';

@Injectable()
export class ApiService {

  private api_base_url = ENV.API_URL;
	private wifi: boolean = true;

  constructor(
    private http: Http,
    private tokenService: TokenService,
    private platform: Platform,
    private util: UtilProvider,
    private network: Network
    /*public navCtrl: NavController, */
  ){

    this.load();
  }
  
  	load() {
		this.network.onDisconnect().subscribe(() => {
		  console.log('network was disconnected :-(');
      this.util.presentToast('No tienes conexión a internet.');
		  this.wifi = false;
		});

		//disconnectSubscription.unsubscribe();

		this.network.onConnect().subscribe(() => {
		  setTimeout(() => {
		    if (this.network.type === 'wifi') {
		    	this.wifi = true;
		      console.log('we got a wifi connection, woohoo!');
		    }
		  }, 3000);
		});
	}


 

  /** A futuro estas funciónes deberían ser parte de una Extensión personalizada de 
      la clase HTTP */
		//disconnectSubscription.unsubscri

  /**
   * Interceptor para componer las cabeceras en cada petición
   * */
  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json'
    };
    if (this.tokenService.getToken()) {
      headersConfig['Authorization'] = 'Bearer '+`${this.tokenService.getToken()}`;
    }   
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }


/** Métodos Http que hacen peticiones a la api y retornan observables */

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${this.api_base_url}${path}`, 
      { headers: this.setHeaders(), search: params }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.api_base_url}${path}`, JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.api_base_url}${path}`, body,{ headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map(res => {
      if(res.status < 200 || res.status >= 300) {
        throw new Error('La petición ha fallado ' + res.status);
      } 
      else {
        return res.json();
      }
    })
  }

  delete(path): Observable<any> {
    return this.http.delete(`${this.api_base_url}${path}`,{ headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }
  

}
