import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    // Faz uma requisição POST para a rota '/api/login', enviando o nome de usuário e a senha
    return this.http.post<{ token: string }>('/api/login', { username, password })
      .pipe(
        // Usa o método tap() do RxJS para realizar uma ação com a resposta recebida
        tap(response => {
          // Armazena o token JWT no LocalStorage
          localStorage.setItem('auth_token', response.token);
        })
      );
  }
}


