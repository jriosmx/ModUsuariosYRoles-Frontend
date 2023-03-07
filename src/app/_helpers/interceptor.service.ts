import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService, 
              private router: Router) { }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(request).pipe( tap(() => {},
  //     (err: any) => {
  //     if (err instanceof HttpErrorResponse) {
  //       if (err.status !== 401) {
  //        return;
  //       }
  //       this.router.navigate(['login']);
  //     }
  //   }))
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if( error.status === 401 ){
        this.tokenStorageService.signOut;
        return next.handle(req);
      }else{
        // message 
        this.router.navigate(['login']);
        return throwError(error);
      }
    }));
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multiple: true}];
