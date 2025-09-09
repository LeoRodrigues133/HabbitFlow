export interface listarTarefaViewModel {
  id: string;
  titulo: string;
  subtarefas: listagemSubTarefaViewModel[];
}
export interface CadastrarTarefaViewModel {
  titulo: string;

}
export interface EditarTarefaViewModel {
  id: string;
  titulo: string;

}
export interface ExcluirTarefaViewModel { }

export interface VisualizarTarefaViewModel {
  id: string;
  titulo: string;
}

export interface listagemSubTarefaViewModel{
  id:string;
  titulo:string;
}
