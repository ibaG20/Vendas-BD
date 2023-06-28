import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionarios-read',
  templateUrl: './funcionarios-read.component.html',
  styleUrls: ['./funcionarios-read.component.css']
})
export class FuncionariosReadComponent implements AfterViewInit {

  funcionarios: Funcionario[] = [];

  displayedColumns: string[] = ['codigo', 'nome', 'cpf', 'senha', 'funcao'];
  dataSource = new MatTableDataSource<Funcionario>(this.funcionarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: FuncionarioService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.funcionarios = resposta;
      console.log(this.funcionarios)
    })
  }
}