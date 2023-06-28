import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-vendas-create',
  templateUrl: './vendas-create.component.html',
  styleUrls: ['./vendas-create.component.css']
})
export class VendasCreateComponent {

  venda: Venda = {
    ven_codigo: '',
    ven_horario: '',
    ven_valor_total: 100,
    tb_funcionarios_fun_codigo: 1,
    ite_codigo: 12124,
    ite_quantidade: 2,
    ite_valor_parcial: 50,
    tb_produtos_pro_codigo: 100,
    tb_vendas_ven_codigo: 1200000

  }

  constructor(private router: Router, private service: VendaService) { }

  ngOnInit(): void { }

  cancel(): void {
    this.router.navigate(['vendas'])
  }

  create(): void {
    this.service.create(this.venda).subscribe((res) => {
      this.router.navigate(['vendas'])
      this.service.message('Venda salva com sucesso!')
    }, err => {
      console.log(err);
    })
  }

}


//----------------------------------------------
