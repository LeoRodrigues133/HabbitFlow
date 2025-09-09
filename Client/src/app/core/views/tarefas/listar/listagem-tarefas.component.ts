import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { listarTarefaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';
import { range } from 'rxjs';
import { DetalhesSubtarefasComponent } from '../modal/detalhes-subtarefas.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listagem-tarefas',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    MatListModule,
    MatIcon,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
    MatTooltipModule,
  ],
  templateUrl: './listagem-tarefas.component.html',
  styleUrl: './listagem-tarefas.component.scss'
})
export class ListagemTarefasComponent implements OnInit {
  tarefas: listarTarefaViewModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas'];

    this.carregarSubtarefas(this.tarefas); // Dá para passar para o resolver depois...
  }

  carregarSubtarefas(tarefas: listarTarefaViewModel[]) {
    tarefas.forEach(tarefa => {
      this.tarefaService.SelecionarTodasSubTarefas(tarefa.id)
        .subscribe(subs => tarefa.subtarefas = subs);
    });
  }

  // Modificar isso aqui depois
  abrirModal(tarefa: any) {
    const dialogRef = this.dialog.open(DetalhesSubtarefasComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '80vw',
      maxHeight: '70vh',
      data: tarefa
    });
  }
}
