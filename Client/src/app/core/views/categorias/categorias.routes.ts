import { Routes } from "@angular/router";
import { CadastrarCategoriaComponent } from "./cadastrar/cadastrar-categoria.component";
import { EditarCategoriasComponent } from "./editar/editar-categorias.component";
import { listagemCategoriasResolver } from "./services/listagem-categoria.resolver";
import { visualizarCategoriaResolver } from "./services/visualizar-categoria.resolver";
import { ExclusaoCategoriaComponent } from "./excluir/exclusao-categoria.component";

export const categoriasRoutes: Routes = [
  {
    path: 'cadastrar',
    component: CadastrarCategoriaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarCategoriasComponent,
    resolve: {
      categoria: visualizarCategoriaResolver
    }
  },
  {
    path: 'excluir/:id',
    component: ExclusaoCategoriaComponent,
    resolve: {
      categoria: visualizarCategoriaResolver
    }
  }
];
