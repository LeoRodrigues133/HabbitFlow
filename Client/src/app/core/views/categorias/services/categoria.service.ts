import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { CadastrarCategoriaViewModel, ListarCategoriaViewModel } from '../models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements OnInit {
    private readonly urlCompleto = `${environment.API_URL}/categoria`;

  private categoriasSource = new BehaviorSubject<ListarCategoriaViewModel[]>([]);
  categorias$ = this.categoriasSource.asObservable();

  /**
   *
   */
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.selecionarTodos();
  }
  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {

    return this.http.get<ListarCategoriaViewModel[]>(this.urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  };

  public cadastrar(categoria: CadastrarCategoriaViewModel): Observable<CadastrarCategoriaViewModel> {

    return this.http.post(this.urlCompleto, categoria)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  atualizarCategorias(categorias: ListarCategoriaViewModel[]) {
    console.log(categorias)
    this.categoriasSource.next(categorias);
  }


  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    return of(EMPTY);
  }

  private processarFalha(resposta: any): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
