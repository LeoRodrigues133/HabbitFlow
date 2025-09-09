
export enum TipoLocalizacaoCompromissoEnum {
  Remoto,
  Presencial,
}

export interface CadastrarCompromissoViewModel {
  titulo: string;
  conteudo?: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  data: Date;
  hora?: string;
  contatoId?: string;
  categoriaId?: string;
}

export interface EditarCompromissoViewModel {
  id:string;
  titulo: string;
  conteudo?: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  data: Date;
  hora?: string;
  contatoId?: string;
  categoriaId?: string;
}

export interface ExcluirCompromissoViewModel {}

export interface ListarCompromissoViewModel {
  id: string;
  titulo: string;
  local?: string;
  conteudo: string;
  data: Date;
  hora?: string ;
}

export interface VisualizarCompromissoViewModel {
  id: string;
  titulo: string;
  conteudo: string;
  local?: string;
  data: Date;
  hora?: string;
}
