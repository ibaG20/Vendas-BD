import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedores-read',
  templateUrl: './fornecedores-read.component.html',
  styleUrls: ['./fornecedores-read.component.css']
})
export class FornecedoresReadComponent implements AfterViewInit {

  fornecedores: Fornecedor[] = [];

  displayedColumns: string[] = ['codigo', 'descricao'];
  dataSource = new MatTableDataSource<Fornecedor>(this.fornecedores);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: FornecedorService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.fornecedores = resposta;
      console.log(this.fornecedores)
    })
  }
}
