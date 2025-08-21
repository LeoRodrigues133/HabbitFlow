import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AutenticarUsuarioViewModel, RegistrarUsuarioViewModel, TokenViewModel } from '../models/auth.models';

@Injectable()
export class AuthService {
  private API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  public registrar(registro: RegistrarUsuarioViewModel): Observable<any> {
    const urlCompleto = `${this.API_URL}/Autenticacao/registrar`;

    return this.http.post<TokenViewModel>(urlCompleto, registro)
      .pipe(map(this.processarDados))
  }

  public autenticar(login: AutenticarUsuarioViewModel): Observable<any> {
    const urlCompleto = `${this.API_URL}/Autenticacao/autenticar`;

    return this.http.post<TokenViewModel>(urlCompleto, login)
      .pipe(map(this.processarDados));
  }

  public logout(): Observable<any> {
    const urlCompleto = `${this.API_URL}/Autenticacao/sair`;

    return this.http.post(urlCompleto, "Logout Realizado");
  }

  public validarExpiracaoToken(data: Date): boolean {
    return data > new Date();
  }

  private processarDados(res: any): TokenViewModel | undefined {
    if (res.sucesso)
      return res.dados;

    throw new Error('Erro ao mapear token do usuário.');
  }
}
