import { NgForOf } from '@angular/common';
import { Component, OnInit,  } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ListagemTarefasComponent } from "../tarefas/listar/listagem-tarefas.component";
import { ListagemCategoriaComponent } from "../categorias/listar/listagem-categoria.component";
import { ListagemCompromissosComponent } from "../compromissos/listar/listagem-compromissos.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    MatListModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
    ListagemCategoriaComponent,
    ListagemTarefasComponent,
    ListagemCompromissosComponent
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  ngOnInit(): void {
  }

  Resumos: any[] = [
    {
      titulo: "Tarefas",
      quantidade: "58"
    }, {
      titulo: "Concluídas",
      quantidade: "20"
    }, {
      titulo: "Pendente",
      quantidade: "2"
    }, {
      titulo: "Categorias",
      quantidade: "4"
    },
  ]

  selectedDate: Date = new Date();
}
