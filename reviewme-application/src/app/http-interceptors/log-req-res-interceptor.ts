import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LogReqResInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Request", req);
        return next.handle(req)
        .pipe(
            tap({
                next: event => event instanceof HttpResponse? console.log("Response", event): ""
            })
        )
    }
}