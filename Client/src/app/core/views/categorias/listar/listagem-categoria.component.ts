import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-listagem-categoria',
  imports: [
    MatListModule,
    MatIcon,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
  ],
  templateUrl: './listagem-categoria.component.html',
  styleUrl: './listagem-categoria.component.scss'
})
export class ListagemCategoriaComponent implements OnInit {

  @Output() categorias = new EventEmitter<string[]>();

  Categorias: string[] = ['Estudos', 'Mercado', 'Academia', 'Leitura'];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.atualizarCategorias(this.Categorias);
  }
}

