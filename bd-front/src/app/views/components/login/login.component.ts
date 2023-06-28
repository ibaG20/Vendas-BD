import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username!: 'zesxrdctfvygbuh';
  password!: '';
  //errorMessage!: string; // Variável para armazenar a mensagem de erro

  constructor(private authService: AuthService, private router: Router) {} // Injetando o Router

  /* entrar():void{
    this.router.navigate(['/']);
  } */

  login():void {
    this.authService.login(this.username, this.password).subscribe((res) =>{
      this.router.navigate(['/']);
      this.authService.message('Login realizado com sucesso!')
    }, err => {
      console.log(err);
      if(err.error.error.match('Login falhou')){
        this.authService.message(err.error.error)
      }
    }); 
  }
}
/* try {
  this.router.navigate(['/']);
  
} catch (error) {
  this.authService
  /* next: response => {
} */
/* next: response => {
//next: () => {
  // Redireciona para a página principal após o login bem-sucedido
  this.router.navigate(['/']);
},
error: err => {
//error: () => {
  // Lidar com erros aqui
  // Exibe uma mensagem de erro
  this.errorMessage = 'Falha no login. Por favor, tente novamente.';
} */
//----------------------------------------



