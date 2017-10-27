import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api-service';
import { TokenService } from './token-service';
import { User } from '../models/user.model'

@Injectable()
export class AuthService {

  public currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  public isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    public apiService: ApiService,
    public tokenService: TokenService
  ){}


/** Este método es llamado en la inicialización de la app y genera una sesión de usuario
    en caso de encontrar un token previamente almacenado.
    Pdta: Falta verificar vigencia del token */
  public populate() {
    if (this.tokenService.getToken()) {
      this.setUserSesion();
    } else {
      this.logout();
    }
  }

  public login(credentials): Observable<any> {
    return this.apiService.post('/login', credentials)
    .map(
      data => {
        if(data.token){
          this.tokenService.saveToken(data.token);
          console.log("entro");
          this.setUserSesion();
          return data;
        } else {
           return data[0].description;
        }
    })
  }

  public signUp(User) {
    return this.apiService.post('/auth/signup', User)
    .map(
      data => {
        if(data.token){
          this.tokenService.saveToken(data.token);
          this.setUserSesion();
          return data;
        } else {
           return data[0].description;
        }
    })
  }

  public setCurrentUser(user: User){
    this.currentUserSubject.next(user);
  }

  public isLogin(){
    return this.tokenService.getToken();
  }

/** Se obtiene el payload del token como un objeto de tipo usuario :(
    se asigna como asunto al observable que propagará los datos del usuario actual
    se asigna verdadero como asunto al observable que propagará el estado de sesión
*/
  public setUserSesion(){
    let payload: User = this.tokenService.getPayload();
    this.currentUserSubject.next(payload);
    this.isAuthenticatedSubject.next(true);
  }


/** Se destruye el token
    se asigna un usuario vacío como asunto al observable que propagará los datos del usuario actual
    se asigna falso como asunto al observable que propagará el estado de sesión
*/
  public logout() {
    this.tokenService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }
}