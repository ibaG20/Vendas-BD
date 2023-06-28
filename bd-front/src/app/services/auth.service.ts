import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  login(username: string, password: string) {
    const url = this.baseUrl + "/login";
    // Faz uma requisição POST para a rota '/api/login', enviando o nome de usuário e a senha
    return this.http.post<{ token: string }>(url, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('auth_token', response.token);          // Armazena o token JWT no LocalStorage
        })
      );
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      duration: 4000
    })
  }
}


