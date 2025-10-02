import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { VisualizarCategoriaViewModel } from '../models/categoria.models';
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListarCompromissoViewModel } from '../../compromissos/models/compromisso.models';
import { listarTarefaViewModel } from '../../tarefas/models/tarefa.models';
import { CompromissoService } from '../../compromissos/services/compromisso.service';
import { TarefaService } from '../../tarefas/services/tarefa.service';
import { CommonModule, DatePipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-detalhes-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterLink,
    MatTooltipModule,
    DatePipe
  ],
  templateUrl: './detalhes-categorias.component.html',
  styleUrls: ['./detalhes-categorias.component.scss']
})
export class DetalhesCategoriasComponent {

  compromissos: ListarCompromissoViewModel[] = [];
  tarefas: listarTarefaViewModel[] = [];

  constructor(
    private compromissoService: CompromissoService,
    private tarefaService: TarefaService,
    private dialogRef: MatDialogRef<DetalhesCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: VisualizarCategoriaViewModel
  ) {
    this.carregarCompromissos();
    this.carregarTarefas();
  }

  private carregarCompromissos() {
    this.compromissoService.selecionarTodos()
      .pipe(
        map(compromissos => compromissos.filter(c => c.categoriaId === this.categoria.id))
      )
      .subscribe(compromissosFiltrados => {
        this.compromissos = compromissosFiltrados;
      });
  }

  private carregarTarefas() {
    this.tarefaService.selecionarTodos()
      .pipe(
        map(tarefas => tarefas.filter(t => t.categoriaId === this.categoria.id))
      )
      .subscribe(tarefasFiltradas => {
        this.tarefas = tarefasFiltradas;
      });
  }

  fechar() {
    this.dialogRef.close();
  }
}
