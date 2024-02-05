import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { handleError } from './error-handler';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  api: string = "http://localhost:3000";
  private authToken: string = "";
  private refreshToken: string = "";
  constructor(private http: HttpClient, private cookie: CookieService) { }

  signUp(userDetails: any): Observable<any> {
    return this.http.post(`${this.api}/sign-up`, userDetails)
    .pipe(
      catchError(handleError)
    );
  };

  login(loginDetails: any): Observable<any> {
    return this.http.post(`${this.api}/login`, loginDetails)
    .pipe(
      catchError(handleError)
    )
  };

  getAuthTokenFromSession(){
    this.authToken = window.sessionStorage.getItem("token") || "";
    return this.authToken;
  }

  getRefreshTokenFromCookie(){
    this.refreshToken = this.cookie.get("refreshToken");
    return this.refreshToken;
  }

  getRefreshToken(){
    return this.http.post(`${this.api}/refresh-token`, { token: this.refreshToken })
    .pipe(
      catchError(handleError)
    )
  }

  setToken(token: string): void {
    window.sessionStorage.setItem("token", token);
  }

  setRefreshToken(refreshToken: any){
    this.cookie.set("refreshToken", refreshToken);
  }

}
