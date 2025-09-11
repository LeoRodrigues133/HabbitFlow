import { NgForOf, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VisualizarCategoriaViewModel } from '../../categorias/models/categoria.models';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DetalhesCategoriasComponent } from '../../categorias/modal/detalhes-categorias.component';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-detalhes-subtarefas',
  imports: [
    NgIf,
    NgForOf,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './detalhes-subtarefas.component.html',
  styleUrl: './detalhes-subtarefas.component.scss'
})
export class DetalhesSubtarefasComponent {
  tarefa: any;

  mostrarInput = false;
  novaSubtitulo = '';

  adicionarSubtarefa() {
    if (!this.novaSubtitulo.trim()) return;

    const novaSubtarefa = { titulo: this.novaSubtitulo, tarefaId: this.tarefa.id };

    this.tarefaService.cadastrarSubtarefa(this.tarefa.id, novaSubtarefa).subscribe({
      next: (registro) => {
        this.tarefa.subtarefas.push(registro);

        this.novaSubtitulo = '';
        this.mostrarInput = false;
      },
      error: (erro) => this.processarFalha(erro)
    });
  }
  subtarefaEmEdicao: any = null;
  tituloEditando = '';

  editarSubtarefa(subtarefa: any) {
    this.subtarefaEmEdicao = subtarefa;
    this.tituloEditando = subtarefa.titulo;
  }

  salvarEdicao(subtarefa: any) {
    if (!this.tituloEditando.trim()) return;

    const subtarefaEditada = { titulo: this.tituloEditando, tarefaId: this.tarefa.id };

    this.tarefaService.editarSubtarefa(this.tarefa.id, subtarefa.id, subtarefaEditada).subscribe({
      next: (registro) => {

        const idx = this.tarefa.subtarefas.findIndex((s: any) => s.id === subtarefa.id);
        if (idx !== -1) this.tarefa.subtarefas[idx] = registro;

        this.subtarefaEmEdicao = null;
        this.tituloEditando = '';
      }
    });
  }

  cancelarEdicao() {
    this.subtarefaEmEdicao = null;
    this.tituloEditando = '';
  }

  excluirSubtarefa(subtarefa: any) {
    if (!confirm(`Deseja excluir a subtarefa "${subtarefa.titulo}"?`)) return;

    this.tarefaService.excluirSubtarefa(this.tarefa.id, subtarefa.id).subscribe({
      next: () => {
        this.tarefa.subtarefas = this.tarefa.subtarefas.filter((s: any) => s.id !== subtarefa.id);
      },
      error: (erro) => this.processarFalha(erro)
    });
  }

  finalizarSubtarefa(_t29: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private dialogRef: MatDialogRef<DetalhesCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VisualizarCategoriaViewModel,
    private tarefaService: TarefaService
  ) {
    this.tarefa = data;
  }

  fechar() {
    this.dialogRef.close(null);
  }



  private processarSucesso(registro: any): void {
    console.log(`Tarefa ${registro.titulo} cadastrada com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}

