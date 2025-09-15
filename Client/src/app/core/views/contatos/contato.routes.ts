import { Routes } from "@angular/router";
import { listagemContatoResolver } from "./services/listagem-contato.resolver";
import { ListagemContatosComponent } from "./listar/listagem-contatos.component";
import { CadastrarContatoComponent } from "./cadastrar/cadastrar-contato.component";
import { EditarContatoComponent } from "./editar/editar-contato.component";
import { ExclusaoContatoComponent } from "./excluir/exclusao-contato.component";
import { visualizarContatoResolver } from "./services/visualizarContatoResolver.resolver";

export const contatosRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListagemContatosComponent,
    resolve: {
      contatos: listagemContatoResolver
    },
  },
  {
    path: 'cadastrar',
    component: CadastrarContatoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarContatoComponent,
    resolve: {
      contato: visualizarContatoResolver,

    }
  },
  {
    path: 'excluir/:id',
    component: ExclusaoContatoComponent,
    resolve: {
      contato: visualizarContatoResolver
    }
  }
];
