import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { CadastrarCategoriaViewModel, EditarCategoriaViewModel, ExcluirCategoriaViewModel, ListarCategoriaViewModel, VisualizarCategoriaViewModel } from '../models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly API_URL = `${environment.API_URL}/categoria`;

  private categoriasSource = new BehaviorSubject<ListarCategoriaViewModel[]>([]);
  categorias$ = this.categoriasSource.asObservable();

  constructor(private http: HttpClient) {
  }

  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {

    return this.http.get<ListarCategoriaViewModel[]>(this.API_URL)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  };

  public selecionarPorId(id: string): Observable<VisualizarCategoriaViewModel> {
    const urlCompleto = `${this.API_URL}/SelectById/${id}`;

    return this.http.get<VisualizarCategoriaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public cadastrar(novaCategoria: CadastrarCategoriaViewModel): Observable<CadastrarCategoriaViewModel> {

    return this.http.post(this.API_URL, novaCategoria)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(id: string, categoriaEditada: EditarCategoriaViewModel): Observable<EditarCategoriaViewModel> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.put<EditarCategoriaViewModel>(urlCompleto, categoriaEditada)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<ExcluirCategoriaViewModel> {
    const urlCompleto = `${this.API_URL}/${id}`;

    return this.http.delete<ExcluirCategoriaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  atualizarCategorias(categorias: ListarCategoriaViewModel[]) {
    console.log(`Service: ${categorias.map(x => x.titulo)}`)

    this.categoriasSource.next(categorias);
  }

  processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    return of(EMPTY);
  }

  processarFalha(resposta: any): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
