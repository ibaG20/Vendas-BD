import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Venda, Item } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl: String = environment.baseUrl;

  constructor(private http : HttpClient) { }

  findAll(): Observable<Item[]>{
    const url = this.baseUrl + "/itens";
    return this.http.get<Item[]>(url);
  }

  addItem(venda: Venda): void {
    const newItem: Item = {
      /* ite_codigo: 0, 
      ite_quantidade: 0,
      ite_valor_parcial: 0,
      tb_produtos_pro_codigo: 0 */
      ite_codigo: '', 
      ite_quantidade: '',
      ite_valor_parcial: '',
      tb_produtos_pro_codigo: ''
    };
    venda.itens.push(newItem);
  }
}

