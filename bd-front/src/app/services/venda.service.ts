import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  baseUrl: String = environment.baseUrl;

  constructor(private http : HttpClient) { }

  findAll(): Observable<Venda[]>{
    const url = this.baseUrl + "/vendas";
    return this.http.get<Venda[]>(url);
  }
}
