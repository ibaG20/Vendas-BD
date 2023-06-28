import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{
  
  //constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Pega o token JWT do armazenamento local
    let token = localStorage.getItem('auth_token');
  
    if (token) {
      // Clona a requisição para adicionar o cabeçalho 'Authorization'
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  
    // Envia a requisição com o cabeçalho 'Authorization'
    return next.handle(request);
  }
}

