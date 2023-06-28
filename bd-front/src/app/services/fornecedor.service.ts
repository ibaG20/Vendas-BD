import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fornecedor } from '../models/fornecedor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  baseUrl: String = environment.baseUrl;

  constructor(private http : HttpClient) { }

  findAll(): Observable<Fornecedor[]>{
    const url = this.baseUrl + "/fornecedores";
    return this.http.get<Fornecedor[]>(url);
  }
}
