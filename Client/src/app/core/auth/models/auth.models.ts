export interface RegistrarUsuarioViewModel {
  nome: string;
  login: string;
  senha: string;
  email: string;
}

export interface TokenViewModel {
  chave: string;
  dataExpiracao: Date;
  usuario: UsuarioTokenViewModel
}

export interface UsuarioTokenViewModel {
  id: string;
  nome: string;
  email: string;
}

export interface AutenticarUsuarioViewModel {
  login: string;
  senha: string;

  usuario: UsuarioTokenViewModel;
}
