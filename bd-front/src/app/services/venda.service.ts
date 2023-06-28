import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venda } from '../models/venda';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  baseUrl: String = environment.baseUrl;

  constructor(private http : HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Venda[]>{
    const url = this.baseUrl + "/vendas";
    return this.http.get<Venda[]>(url);
  }
  
  create(venda: Venda): Observable<Venda> {
    const url = this.baseUrl + "/vendas";
    return this.http.post<Venda>(url, venda);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
