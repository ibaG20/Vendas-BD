import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos-read',
  templateUrl: './produtos-read.component.html',
  styleUrls: ['./produtos-read.component.css']
})
export class ProdutosReadComponent implements AfterViewInit {

  produtos: Produto[] = [];

  displayedColumns: string[] = ['codigo', 'descricao', 'valor', 'quantidade', 'fornecedores_codigo'];
  dataSource = new MatTableDataSource<Produto>(this.produtos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ProdutoService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.produtos = resposta;
      console.log(this.produtos)
    })
  }
}
