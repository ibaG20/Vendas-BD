import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item, Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';
import { HttpClient } from '@angular/common/http';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-vendas-create',
  templateUrl: './vendas-create.component.html',
  styleUrls: ['./vendas-create.component.css']
})
export class VendasCreateComponent {

//COM DADOS PRONTOS --->>>> assim ele funcionou
  /* venda: Venda = {
    ven_codigo: 11,
    ven_horario: '02:22:00',
    ven_valor_total: 100,
    tb_funcionarios_fun_codigo: 3,
    itens: [
      {
        ite_codigo: 9,
        ite_quantidade: 2,
        ite_valor_parcial: 60,
        tb_produtos_pro_codigo: 300
      }
    ]
  }; */
  venda: Venda = {
    ven_codigo: '',
    ven_horario: '',
    ven_valor_total: '',
    tb_funcionarios_fun_codigo: '',
    itens: [
      {
        ite_codigo: '',
        ite_quantidade: '',
        ite_valor_parcial: '',
        tb_produtos_pro_codigo: ''
      }
    ]
  };
  
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private service: VendaService,
    private itemService: ItemService
  ) { }
  
  ngOnInit(): void { }
  
  cancel(): void {
    this.router.navigate(['vendas'])
  }

  /* addItem(): void {
  //addItem() {
    const newItem: Item = {
      ite_quantidade: 0,
      ite_valor_parcial: 0,
      tb_produtos_pro_codigo: 0
    };
    this.venda.itens.push(newItem);
  } */
  addItem() {
    this.itemService.addItem(this.venda);
  }
  
  create(): void {
    this.service.create(this.venda).subscribe((res) => {
      this.router.navigate(['vendas'])
      this.service.message('Venda salva com sucesso!')
      console.log(this.venda);
      
    }, err => {
      console.log(err);
    })
  }
  
}


//----------------------------------------------


/* addItem() {
  this.venda.itens.push(this.novoItem);
  this.novoItem = {
    ite_quantidade: 0,
    ite_valor_parcial: 0,
    tb_produtos_pro_codigo: 0
  };
} */


  //--------------------------------------------
  
  //ULTIMA TENTATIVA
  
  /* venda: Venda = {
    ven_codigo: '',
    ven_horario: '',
    ven_valor_total: '',
    tb_funcionarios_fun_codigo: '',
    itens: []
  };
  
  novoItem: Item = {
    ite_codigo: '',
    ite_quantidade: '',
    ite_valor_parcial: '',
    tb_produtos_pro_codigo: ''
  };
  */
  /* venda: Venda = {
    ven_codigo: 11,
    ven_horario: '10:10:10',
    ven_valor_total: 24,
    tb_funcionarios_fun_codigo: 1,
    itens: []
  };
  
  novoItem: Item = {
    ite_codigo: 9,
    ite_quantidade: 6,
    ite_valor_parcial: 4,
    tb_produtos_pro_codigo: 300
  }; */
  
  //--------------------------------------------