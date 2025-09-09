import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import {
  CadastrarCompromissoViewModel,
  EditarCompromissoViewModel,
  ExcluirCompromissoViewModel,
  ListarCompromissoViewModel,
  VisualizarCompromissoViewModel
} from '../models/compromisso.models';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  private readonly API_URL = `${environment.API_URL}/Compromisso`;

  constructor(private http: HttpClient) { }


  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http.get<ListarCompromissoViewModel[]>(this.API_URL)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string)
  : Observable<VisualizarCompromissoViewModel> {
    const urlCompleto = `${this.API_URL}/SelectById/${id}`;

    return this.http.get<VisualizarCompromissoViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  public cadastrar(novoCompromisso: CadastrarCompromissoViewModel)
  : Observable<CadastrarCompromissoViewModel> {

    return this.http.post<CadastrarCompromissoViewModel>(this.API_URL, novoCompromisso)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }


  public editar(id: string, compromissoEditada: EditarCompromissoViewModel)
  : Observable<EditarCompromissoViewModel> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.put<EditarCompromissoViewModel>(urlCompleto, compromissoEditada)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<ExcluirCompromissoViewModel> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.delete<ExcluirCompromissoViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    return of(EMPTY);
  }

  processarFalha(resposta: any): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
