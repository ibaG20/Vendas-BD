import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/components/home/home.component';
import { FornecedoresReadComponent } from './views/components/fornecedores/fornecedores-read/fornecedores-read.component';
import { FuncionariosReadComponent } from './views/components/funcionarios/funcionarios-read/funcionarios-read.component';
import { VendasReadComponent } from './views/components/vendas/vendas-read/vendas-read.component';
import { ProdutosReadComponent } from './views/components/produto/produtos-read/produtos-read.component';
import { ItensReadComponent } from './views/components/itens/itens-read/itens-read.component';
import { LoginComponent } from './views/components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { VendasCreateComponent } from './views/components/vendas/vendas-create/vendas-create.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'fornecedores',
    component: FornecedoresReadComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'funcionarios',
    component: FuncionariosReadComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'vendas',
    component: VendasReadComponent,
    //canActivate: [AuthGuard]
  },

  {
    path: 'vendas/create',
    component: VendasCreateComponent,
    //canActivate: [AuthGuard]
  },
  
  {
    path: 'itens',
    component: ItensReadComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'produtos',
    component: ProdutosReadComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//--------------------------


