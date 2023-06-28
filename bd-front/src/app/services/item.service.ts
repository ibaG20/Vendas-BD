import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

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
}