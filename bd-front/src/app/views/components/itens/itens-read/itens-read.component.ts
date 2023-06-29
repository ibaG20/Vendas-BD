import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/models/venda';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-itens-read',
  templateUrl: './itens-read.component.html',
  styleUrls: ['./itens-read.component.css']
})
export class ItensReadComponent implements AfterViewInit {

  itens: Item[] = []

  displayedColumns: string[] = ['codigo', 'quantidade', 'valor_parcial', 'produtos_codigo', 'vendas_codigo'];
  dataSource = new MatTableDataSource<Item>(this.itens);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ItemService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.itens = resposta;
      console.log(this.itens)
    })
  }
}
