import { Routes } from '@angular/router';
import { ListagemItens } from './components/listagem-itens/listagem-itens';
import { FormularioItem } from './components/formulario-item/formulario-item';

export const routes: Routes = [
  { path: '', component: ListagemItens },
  { path: 'novo-item', component: FormularioItem },
  { path: 'editar-item/:id', component: FormularioItem }
];

