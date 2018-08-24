import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Login, Register } from '../models/request/authentication';
import { Token, UserRegister } from '../models/response/authentication';
import { Configs } from '../assets/config';
import * as jwt_decode from "jwt-decode";
import { User } from '../models/user';
import { Router } from "@angular/router";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as moment from "moment";

@Injectable()
export class AuthenticationService {

  private _loginUrl: string;
  private _registerUrl: string;

  private _user: User;

  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) {
    this._loginUrl = Configs.authentication_base_url + Configs.authentication_login;
    this._registerUrl = Configs.authentication_base_url + Configs.authentication_register;
  }

  /**
   * Logs in the user and sets a "jwt" and "expires_at" values in localStorage
   * @param req - Login request
   */
  public login(req: Login): Observable<User> {
    return this.http.post<Token>(this._loginUrl, req, this._httpOptions).pipe(
      map((token: Token) => {
        return token.token;
      }),
      switchMap((token: string) => {
        return this._setUserFromJWT(token);
      })
    )
  }

  /**
  * Registers a user and logs the user if success
  * @param req - Login request
  */
  public register(req: Register): Observable<UserRegister> {
    return this.http.post<UserRegister>(this._registerUrl, req, this._httpOptions)
  }

  /**
   * Returns the User with its session data
   */
  public getUser(): User {
    return this._user;
  }

  /**
   * Removes session data from localStorage and deletes service user
   */
  public logout(): void {
    this._user = null;
    localStorage.removeItem("jwt");
    localStorage.removeItem("expires_at");
  }

  /**
   * Verifies through localstorage key "expires_at" if expiration is in time 
   */
  public isLoggedIn(): boolean {
    return moment().isBefore(this._getExpiration());
  }

  /**
   * Returns necessary headers for doing requests to ADMIN API
   */
  public getAdminAPIRequestHeaders(): HttpHeaders {
    let jwt = localStorage.getItem('jwt');
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt });
  }

  /**
   * Returns necessary headers for doing requests to ADMIN API SAFT resource
   */
  public getAdminAPISAFTRequestHeaders(): HttpHeaders {
    let jwt = localStorage.getItem('jwt');
    return new HttpHeaders({ 'Content-Type': `multipart/form-data; boundary="----WebKitFormBoundary7MA4YWxkTrZu0gW"`, 'Authorization': 'Bearer ' + jwt });
  }

    /**
   * Returns necessary headers for doing requests to ADMIN API SAFT resource
   */
  public getJWTHeaders(): HttpHeaders {
    let jwt = localStorage.getItem('jwt');
    return new HttpHeaders({'Authorization': 'Bearer ' + jwt });
  }

  // PRIVATE HELPER METHODS

  private _getExpiration(): moment.Moment {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private _setUserFromJWT(jwt: string): Observable<User> {
    return Observable.create((observer) => {
      try {
        let tokenData = jwt_decode(jwt);

        this._user = new User();
        this._user.email = tokenData.email;
        this._user.username = tokenData.username;
        this._user.roles = tokenData.roles.slice();
        this._user.sessionTimeout = tokenData.exp;
        this._user.jwt = jwt; // for using in API services requests

        // set in localStorage expiration and jwt 
        const expiresAt = moment().add(this._user.sessionTimeout, 'second');
        localStorage.setItem('jwt', this._user.jwt);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

        observer.next(this._user);
      } catch (error) {
        this._user = new User();
        observer.error(error);
      }
    });
  }
}