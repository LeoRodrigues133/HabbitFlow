import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-listagem-tarefas',
  imports: [
    MatListModule,
    MatIcon,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
  ],
  templateUrl: './listagem-tarefas.component.html',
  styleUrl: './listagem-tarefas.component.scss'
})
export class ListagemTarefasComponent {
  Tarefas: string[] = ['lavar o cachorro', 'lavar a louça', 'lavar a lava'];
}
