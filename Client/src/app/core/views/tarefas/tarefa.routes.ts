import { Routes } from "@angular/router"
import { ListagemTarefasComponent } from "./listar/listagem-tarefas.component"
import { listagemTarefaResolver } from "./services/listagem-tarefa.resolver"
import { CadastrarTarefaComponent } from "./cadastrar/cadastrar-tarefa.component"
import { EditarTarefaComponent } from "./editar/editar-tarefa.component"
import { visualizarTarefaResolver } from "./services/visualizar-tarefa.resolver"
import { ExclusaoTarefaComponent } from "./excluir/exclusao-tarefa.component"
import { DetalhesSubtarefasComponent } from "./modal/detalhes-subtarefas.component"
import { listagemCategoriasResolver } from "../categorias/services/listagem-categoria.resolver"

export const tarefaRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListagemTarefasComponent,
    resolve: {
      tarefas: listagemTarefaResolver
    },
  },
  {
    path: 'cadastrar',
    component: CadastrarTarefaComponent,
    resolve: {
      categorias: listagemCategoriasResolver

    }
  },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: {
      tarefa: visualizarTarefaResolver,
      categorias: listagemCategoriasResolver

    }
  },
  {
    path: 'excluir/:id',
    component: ExclusaoTarefaComponent,
    resolve: {
      tarefa: visualizarTarefaResolver
    }
  },
  {
    path: 'ListarSubtarefas/:id',
    component: DetalhesSubtarefasComponent,

  }
]
