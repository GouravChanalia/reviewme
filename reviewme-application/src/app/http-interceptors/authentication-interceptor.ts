import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, switchMap, tap, throwError } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { AuthenticationService } from "../authentication.service"; 

@Injectable()

export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes("login") || req.url.includes("sign-up") || req.url.includes("refresh-token") ){
            return next.handle(req)
            .pipe(
                tap(event => {
                        if(event instanceof HttpResponse && event.body){
                            /** store token in sessionStorage */
                            if(event.body?.token){
                                this.authService.setToken(event.body.token);
                            }
                            
                            /** refreshToken into browser cookies */
                            if(event.body?.refreshToken){
                                this.authService.setRefreshToken(event.body.refreshToken);
                            }
                        }
                    }
                )
            )
        } else {
            const token = this.authService.getAuthTokenFromSession();
            const refreshToken = this.authService.getRefreshTokenFromCookie();
            if (token && typeof token === "string"){
                const authReq = req.clone({ setHeaders : { Authorization: `Bearer ${token}` } });
                return next.handle(authReq).pipe(
                    catchError( (error: any) => {
                        if(error instanceof HttpErrorResponse && error.status === 401){
                            return this.authService.getRefreshToken().pipe(
                                switchMap( (res: any) => {
                                    this.authService.setToken(res.token);
                                    return next.handle(req);
                                } )
                            )
                        }
                        return throwError(() => new Error(error));
                    } )
                )
                .pipe(
                    catchError( (error: any) => {
                        return throwError(() => new Error(error));
                    } )
                )
            } else if (refreshToken && typeof refreshToken === "string") {
                return this.authService.getRefreshToken().pipe(
                    switchMap( (res: any) => {
                        this.authService.setToken(res.body.token);
                        const newAuthReq = req.clone({setHeaders: { Authorization: `Bearer ${refreshToken}` }})
                        return next.handle(newAuthReq);
                    } )
                )
            } else {
                /** route application to sign up page */
                return next.handle(req);
            }
        }
    }
}