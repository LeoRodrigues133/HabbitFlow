export interface ListarCategoriaViewModel {
  id: string;
  titulo: string;
}
export interface CadastrarCategoriaViewModel{
  titulo:string;
}

export interface EditarCategoriaViewModel{
  titulo:string;
}

export interface ExcluirCategoriaViewModel{}

export interface VisualizarCategoriaViewModel{
  id: string;
  titulo:string;

  conteudo: any[]; // A ideia é receber tanto compromissos, quanto tarefas;
}
