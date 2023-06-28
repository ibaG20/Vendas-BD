import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-vendas-read',
  templateUrl: './vendas-read.component.html',
  styleUrls: ['./vendas-read.component.css']
})
export class VendasReadComponent implements AfterViewInit {

  vendas: Venda[] = [];

  displayedColumns: string[] = ['codigo', 'horario', 'valor', 'fornecedores_codigo'];
  dataSource = new MatTableDataSource<Venda>(this.vendas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: VendaService,
    private router: Router
    ){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.vendas = resposta;
      console.log(this.vendas)
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['vendas/create'])
  }
}