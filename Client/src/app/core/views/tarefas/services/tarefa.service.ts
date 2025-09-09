import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import {
  CadastrarTarefaViewModel,
  EditarTarefaViewModel,
  ExcluirTarefaViewModel
} from '../models/tarefa.models';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private readonly API_URL = `${environment.API_URL}/Tarefa`;

  constructor(private http: HttpClient) { }

  public selecionarTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string)
    : Observable<any> {
    const urlCompleto = `${this.API_URL}/SelectById/${id}`;

    return this.http.get<any>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  public cadastrar(novaTarefa: CadastrarTarefaViewModel)
    : Observable<CadastrarTarefaViewModel> {

    return this.http.post<CadastrarTarefaViewModel>(this.API_URL, novaTarefa)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }


  public editar(id: string, tarefaEditada: EditarTarefaViewModel)
    : Observable<EditarTarefaViewModel> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.put<EditarTarefaViewModel>(urlCompleto, tarefaEditada)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<ExcluirTarefaViewModel> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.delete<ExcluirTarefaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public SelecionarTodasSubTarefas(id: string): Observable<any> {
    const urlCompleto = `${this.API_URL}/ListarSubtarefas/${id}`;

    return this.http.get<any>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public cadastrarSubtarefa(tarefaId: string, novaSebtarefa: any)
    : Observable<any> {
    const urlCompleto = `${this.API_URL}/${tarefaId}/subtarefa/cadastrar`

    return this.http.post<any>(urlCompleto, novaSebtarefa)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editarSubtarefa(tarefaId: string, id: string, subtarefaEditada: any): Observable<any> {
    const urlCompleto = `${this.API_URL}/${tarefaId}/subtarefa/editar/${id}`

    return this.http.put<any>(urlCompleto, subtarefaEditada);
  }

  public excluirSubtarefa(tarefaId: string, id: string): Observable<any> {
    const urlCompleto = `${this.API_URL}/${tarefaId}/subtarefa/excluir/${id}`

    return this.http.delete<any>(urlCompleto);
  }

  processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    return of(EMPTY);
  }

  processarFalha(resposta: any): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
