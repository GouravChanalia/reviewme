import { AuthenticationInterceptor } from "./authentication-interceptor";
import { Provider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LogReqResInterceptor } from "./log-req-res-interceptor";

export const httpInterceptorProviders: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogReqResInterceptor, multi: true }
];