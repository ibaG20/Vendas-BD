import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username!: string;
  password!: string;
  errorMessage!: string; // Variável para armazenar a mensagem de erro

  constructor(private authService: AuthService, private router: Router) {} // Injetando o Router

  login() {
    this.authService.login(this.username, this.password).subscribe({
      //next: response => {
      next: () => {
        // Redireciona para a página principal após o login bem-sucedido
        this.router.navigate(['/']);
      },
      //error: err => {
      error: () => {
        // Lidar com erros aqui
        // Exibe uma mensagem de erro
        this.errorMessage = 'Falha no login. Por favor, tente novamente.';
      }
    });
  }
}
//----------------------------------------



