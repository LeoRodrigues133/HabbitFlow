import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CategoriaService } from '../services/categoria.service';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarCategoriaViewModel } from '../models/categoria.models';

@Component({
  selector: 'app-listagem-categoria',
  imports: [
    NgIf,
    RouterLink,
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

  Categorias:ListarCategoriaViewModel[] = [];

  constructor(private route: ActivatedRoute, private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.categoriaService.selecionarTodos().subscribe((categorias) => {
      this.Categorias = categorias;
      this.categoriaService.atualizarCategorias(this.Categorias);
    });
  }
}

