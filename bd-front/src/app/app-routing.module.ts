import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/components/home/home.component';
import { FornecedoresReadComponent } from './views/components/fornecedores/fornecedores-read/fornecedores-read.component';
import { FuncionariosReadComponent } from './views/components/funcionarios/funcionarios-read/funcionarios-read.component';
import { VendasReadComponent } from './views/components/vendas/vendas-read/vendas-read.component';
import { ProdutosReadComponent } from './views/components/produto/produtos-read/produtos-read.component';
import { ItensReadComponent } from './views/components/itens/itens-read/itens-read.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'fornecedores',
    component: FornecedoresReadComponent
  },

  {
    path: 'funcionarios',
    component: FuncionariosReadComponent
  },

  {
    path: 'vendas',
    component: VendasReadComponent
  },

  {
    path: 'itens',
    component: ItensReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
