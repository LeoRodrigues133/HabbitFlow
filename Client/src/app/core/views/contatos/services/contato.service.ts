import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { ListarContatoViewModel } from '../models/contato.models';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  readonly API_URL = `${environment.API_URL}/contato`

  constructor(private http: HttpClient) { }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http.get<ListarContatoViewModel[]>(this.API_URL)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<ListarContatoViewModel> {
    const urlCompleto = `${this.API_URL}/SelectById/${id}`;

    return this.http.get<ListarContatoViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public cadastrar(novoContato: any): Observable<any> {
    return this.http.post<any>(this.API_URL, novoContato)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(id: string, contatoEditado: any): Observable<any> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.put<any>(urlCompleto, contatoEditado)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<any> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.delete<any>(urlCompleto)
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
