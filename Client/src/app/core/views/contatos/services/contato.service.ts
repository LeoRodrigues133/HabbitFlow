import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { CadastrarContatoViewModel, EditarContatoViewModel, ExcluirContatoViewModel, ListarContatoViewModel } from '../models/contato.models';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  readonly API_URL = `${environment.API_URL}/contato`

  constructor(private http: HttpClient) { }

  public selecionarTodos()
    : Observable<ListarContatoViewModel[]> {
    return this.http.get<ListarContatoViewModel[]>(this.API_URL)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string)
    : Observable<ListarContatoViewModel> {
    const urlCompleto = `${this.API_URL}/SelectById/${id}`;

    return this.http.get<ListarContatoViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public cadastrar(novoContato: CadastrarContatoViewModel)
    : Observable<CadastrarContatoViewModel> {
    return this.http.post<CadastrarContatoViewModel>(this.API_URL, novoContato)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(id: string, contatoEditado: EditarContatoViewModel)
    : Observable<EditarContatoViewModel> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.put<EditarContatoViewModel>(urlCompleto, contatoEditado)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string)
    : Observable<ExcluirContatoViewModel> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.delete<ExcluirContatoViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  processarDados(res: any) {
    if (res.sucesso) return res.dados;

    return of(EMPTY)
  }

  processarFalha(res: any): Observable<never> {
    return throwError(() => new Error(res.error.erros[0]))
  }
}
