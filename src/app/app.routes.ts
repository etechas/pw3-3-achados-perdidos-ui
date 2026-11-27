import { Routes } from '@angular/router';
import { ListagemComponent } from './shared/component/listagem/listagem';
import { FormularioComponent } from './shared/component/formulario/formulario';

export const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'novo', component: FormularioComponent },
  { path: 'editar/:id', component: FormularioComponent },
  { path: '**', redirectTo: '' }
];