import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriasSource = new BehaviorSubject<string[]>([]);
  categorias$ = this.categoriasSource.asObservable();

  atualizarCategorias(categorias: string[]) {
    this.categoriasSource.next(categorias);
  }
}
