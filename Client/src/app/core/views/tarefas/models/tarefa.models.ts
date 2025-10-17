export interface listarTarefaViewModel {
  id: string;
  titulo: string;
  subtarefas: listagemSubTarefaViewModel[];
}
export interface CadastrarTarefaViewModel {
  titulo: string;
  categoriaId?: string;
}
export interface EditarTarefaViewModel {
  id: string;
  titulo: string;
  categoriaId?: string;

}
export interface ExcluirTarefaViewModel { }

export interface VisualizarTarefaViewModel {
  id: string;
  titulo: string;

  subtarefas: listagemSubTarefaViewModel[]
}

export interface listagemSubTarefaViewModel {
  id: string;
  titulo: string;
  finalizada: boolean;
}

export interface CadastroSubtarefaViewModel {
  titulo: string;
  finalizada: boolean;
  tarefaId: string
}
export interface EdicaoSubtarefaViewModel {
  id: string;
  titulo: string;
  finalizada: boolean;
  tarefaId: string
}

export interface ExcluirSubtarefaViewModel{}
