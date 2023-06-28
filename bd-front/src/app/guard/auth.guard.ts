import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

// Aqui é onde você define a interface
interface DecodedToken {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Aqui é onde você faz o type assertion
    const decodedToken = jwtDecode(token) as DecodedToken;
    if (decodedToken.role !== 'admin') {
      // Redirecione para uma página de erro ou para outro lugar
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
}








/* import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== 'admin') {
      // Redirecione para uma página de erro ou para outro lugar
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
} */
