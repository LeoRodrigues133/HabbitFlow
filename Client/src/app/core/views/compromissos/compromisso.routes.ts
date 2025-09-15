import { Routes } from "@angular/router";
import { EditarCompromissoComponent } from "./editar/editar-compromisso.component";
import { listagemCompromissoResolver } from "./services/listagem-compromisso.resolver";
import { ExclusaoCompromissoComponent } from "./excluir/exclusao-compromisso.component";
import { ListagemCompromissosComponent } from "./listar/listagem-compromissos.component";
import { visualizarCompromissoResolver } from "./services/visualizar-compromisso.resolver";
import { CadastrarCompromissoComponent } from "./cadastrar/cadastrar-compromisso.component";
import { listagemContatoResolver } from "../contatos/services/listagem-contato.resolver";
import { listagemCategoriasResolver } from "../categorias/services/listagem-categoria.resolver";

export const compromissosRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListagemCompromissosComponent,
    resolve: {
      compromissos: listagemCompromissoResolver
    },
  },
  {
    path: 'cadastrar',
    component: CadastrarCompromissoComponent,
    resolve: {
      contatos: listagemContatoResolver,
      categorias: listagemCategoriasResolver
    },

  },
  {
    path: 'editar/:id',
    component: EditarCompromissoComponent,
    resolve: {
      compromisso: visualizarCompromissoResolver,
      contatos: listagemContatoResolver,
      categorias: listagemCategoriasResolver

    }
  },
  {
    path: 'excluir/:id',
    component: ExclusaoCompromissoComponent,
    resolve: {
      compromisso: visualizarCompromissoResolver
    }
  }
];
