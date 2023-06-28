import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../models/funcionario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl: String = environment.baseUrl;

  constructor(private http : HttpClient) { }

  findAll(): Observable<Funcionario[]>{
    const url = this.baseUrl + "/funcionarios";
    return this.http.get<Funcionario[]>(url);
  }
}
