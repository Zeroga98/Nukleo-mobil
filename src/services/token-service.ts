import { Injectable } from '@angular/core';
import { User } from '../models/user.model'


@Injectable()
export class TokenService {

  getToken(): String {
    return window.localStorage['roadjwt'];
  }

  saveToken(token: String) {
    window.localStorage['roadjwt'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('roadjwt');
  }

// Decodifica el Token y retorna el Payload como tipo usuario
  getPayload(): User {
  	let token = this.getToken();
    if (token && 3 === token.split(".").length) {
		return(JSON.parse(decodeURIComponent(
			window.atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
		)));
    }
  }

// Verifica la vigencia del Token
  verify(): boolean {
    let token = this.getPayload();
    return token && token['exp'] ? Math.round((new Date).getTime() / 1E3) <= token['exp'] ? true : false : (
      console.log("Las credenciales de acceso no son validas"), false
    );
  }

}
