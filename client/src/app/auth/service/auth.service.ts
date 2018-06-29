import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {RegistrationModel} from "../model/registration-model";
import {LoggedInUser} from "../model/loggedInUser";
import {LoginResult} from "../model/loginResult";
import {BehaviorSubject, Observable} from "rxjs/index";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject = new BehaviorSubject<LoggedInUser>(null);
  private tokenTimer;

  private registerUrl = environment.apiUrl + 'register';
  private loginUrl = environment.apiUrl + 'login';

  constructor(private http: HttpClient,
              private router: Router) {
  }
  /**
   * get observabale for logged in user
   *
   * @returns {Observable<LoggedInUser>}
   */
  getUserLoggedInUserObservable(): Observable<LoggedInUser>{
    return this.loggedInUserSubject.asObservable();
  }

  /**
   * logout and navigate to login
   *
   *
   */
  logout(){
    localStorage.clear();
    clearTimeout(this.tokenTimer);
    this.loggedInUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  /**
   * login
   *
   *
   * @param {string} email
   * @param password
   * @returns {Promise<any>}
   */

  async login(email: string, password): Promise<{ success: boolean, message?: string}> {
    const body = {
      email,
      password
    };
    try {
      const result = await this.http.post<LoginResult>(this.loginUrl, body)
        .pipe(map((result: LoginResult) => {
          if (result.success) {
            const mapResult: { success: boolean, token: string,
              user: LoggedInUser, expiresInSeconds: number } = {
              success: true,
              token: result.token,
              expiresInSeconds: result.expiresInSeconds,
              user: {
                firstName: result.record.firstName,
                lastName: result.record.lastName,
                email: result.record.email,
                id: result.record._id
              }
            };
            return mapResult;
          }
          return result;
        })).toPromise();
      if (result.success) {
        this.setTokenUser(result);
        this.loggedInUserSubject.next(result['user']);
        this.setAuthTimer(result.expiresInSeconds*1000);
        this.router.navigate(['/']);
      }
      return result;
    } catch (e) {
      return {
        success: false,
        message: ' Authentication Failed - system error'
      };

    }
  }

  /**
   *
   *
   * @param {{token: string; user: LoggedInUser}} result
   */
  private setTokenUser(result) {
    const currTime =  new Date().getTime();
    const expiresInTime = currTime + (result.expiresInSeconds * 1000);
    localStorage.setItem('loggedInUser', JSON.stringify(result.user));
    localStorage.setItem('token', result.token);
    localStorage.setItem('expiresIn','' + expiresInTime);
  }

  /**
   * try to auto login user
   *
   */
  autoAuthUser() {
    const authData = this.getAuthData();
    if (!authData) {
      return;
    }
    const currTime = new Date().getTime();
    const expiresTime = authData.expiresIn - currTime;
    if(expiresTime > 0){
      const loggedInUser: LoggedInUser = this.getUserLoggedInUser();
      this.loggedInUserSubject.next(loggedInUser);
      this.setAuthTimer(expiresTime);
      this.router.navigate(["/"]);

    }else{
     localStorage.clear();
    }

  }


  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      console.log("automatic timeout ");
      this.logout();
    }, duration );
  }
  /**
   * gets token if it exists
   *
   */
  getToken(){
    return localStorage.getItem('token');
  }

  getAuthData(): { token: string, expiresIn: number}{
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    if(!token || !expiresIn){
      return null;
    }
    return {
      token: token,
      expiresIn: +expiresIn
    }
  }
  /**
   * get loggedInUser from local storage
   *
   * @returns {LoggedInUser}
   */

  getUserLoggedInUser(): LoggedInUser{
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if(loggedInUserStr){
      const loggedInUser:LoggedInUser = JSON.parse(loggedInUserStr);
      return loggedInUser;
    }else{
      return null;
    }

  }

  /**
   * registers a user
   *
   * @param data
   * @returns {Promise<any>}
   */
  async registerUser(data): Promise<any> {

    try {
      const result = await this.http
        .post<{ success: boolean, message?: string, record?: RegistrationModel }>(this.registerUrl, data)
        .pipe(map(result => {
          console.log('registration result', result);
          return result;
        })).toPromise();
      return result;
    } catch (e) {
      return {
        success: false,
        error: e
      };

    }
  }
}
