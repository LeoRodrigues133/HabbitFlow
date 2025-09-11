import { Routes } from "@angular/router";
import { ListagemContatosComponent } from "./listar/listagem-contatos.component";
import { listagemContatoResolver } from "./listagem-contato.resolver";

export const contatosRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListagemContatosComponent,
    resolve: { compromissos: listagemContatoResolver },
  },

];
