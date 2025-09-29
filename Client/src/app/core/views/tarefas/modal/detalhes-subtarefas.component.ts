import {
  CadastroSubtarefaViewModel,
  EdicaoSubtarefaViewModel,
  listagemSubTarefaViewModel,
  VisualizarTarefaViewModel
} from '../models/tarefa.models';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { TarefaService } from '../services/tarefa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DetalhesCategoriasComponent } from '../../categorias/modal/detalhes-categorias.component';

@Component({
  selector: 'app-detalhes-subtarefas',
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    MatTooltipModule
  ],
  templateUrl: './detalhes-subtarefas.component.html',
  styleUrl: './detalhes-subtarefas.component.scss'
})
export class DetalhesSubtarefasComponent {
  tarefa: VisualizarTarefaViewModel
  mostrarInput = false
  inputSubtarefa = ''
  subtarefaEmEdicao?: EdicaoSubtarefaViewModel
  tituloEditando = this.subtarefaEmEdicao?.titulo

  constructor(
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<DetalhesCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VisualizarTarefaViewModel,
    private tarefaService: TarefaService
  ) {
    this.tarefa = data
    this.tarefa.subtarefas = (this.tarefa.subtarefas || []).filter(s => s != null)
  }

  adicionarSubtarefa() {
    if (!this.inputSubtarefa.trim()) return
    const novaSubtarefa: CadastroSubtarefaViewModel = {
      titulo: this.inputSubtarefa,
      tarefaId: this.tarefa.id,
      finalizada: false
    }
    this.tarefaService.cadastrarSubtarefa(this.tarefa.id, novaSubtarefa).subscribe({
      next: subtarefa => {
        this.atualizarListaSubtarefas()
        this.inputSubtarefa = ''
        this.mostrarInput = false
        this.processarSucesso(subtarefa.titulo, 'cadastrada')
      },
      error: erro => this.processarFalha(erro)
    })
  }

  editarSubtarefa(subtarefa: listagemSubTarefaViewModel) {
    this.subtarefaEmEdicao = { ...subtarefa, tarefaId: this.tarefa.id }
    this.tituloEditando = subtarefa.titulo
  }

  salvarEdicao(subtarefa: any) {
    if (!this.tituloEditando?.trim()) return

    const subtarefaEditada: EdicaoSubtarefaViewModel = {
      id: subtarefa.id,
      titulo: this.tituloEditando,
      tarefaId: this.tarefa.id,
      finalizada: subtarefa.finalizada
    }
    this.tarefaService.editarSubtarefa(this.tarefa.id, subtarefa.id, subtarefaEditada).subscribe({
      next: () => {
        this.tarefaService.SelecionarTodasSubTarefas(this.tarefa.id).subscribe(subtarefas => {
          this.tarefa.subtarefas = subtarefas;
          this.cdr.detectChanges();

          this.processarSucesso(subtarefaEditada.titulo, 'editada');
        });

        this.subtarefaEmEdicao = undefined;
        this.tituloEditando = '';


      },

      error: erro => this.processarFalha(erro)
    });

  }

  cancelarEdicao() {
    this.subtarefaEmEdicao = undefined
    this.tituloEditando = ''
  }

  excluirSubtarefa(subtarefa: any) {
    this.tarefaService.excluirSubtarefa(this.tarefa.id, subtarefa.id).subscribe({
      next: () => {

        this.tarefa.subtarefas = this.tarefa.subtarefas.filter(s => s.id !== subtarefa.id)

        this.processarSucesso('selecionada', 'excluida');
      },
      error: erro => this.processarFalha(erro)
    })
  }

  finalizarSubtarefa(subtarefa: any) {
    this.tarefaService.concluirSubtarefa(this.tarefa.id, subtarefa.id, subtarefa).subscribe({
      next: () => console.log(`Subtarefa ${subtarefa.titulo} finalizada com sucesso!`),
      error: erro => this.processarFalha(erro)
    })
  }

  reabrirSubtarefa(subtarefa: any) {
    this.tarefaService.reabrirSubtarefa(this.tarefa.id, subtarefa.id, subtarefa).subscribe({
      next: () => console.log(`Subtarefa ${subtarefa.titulo} reaberta com sucesso!`),
      error: erro => this.processarFalha(erro)
    })
  }

  alterarStatus(subtarefa: any) {
    subtarefa.finalizada = !subtarefa.finalizada
    this.cdr.detectChanges()
    if (subtarefa.finalizada) {
      this.tarefaService.concluirSubtarefa(this.tarefa.id, subtarefa.id, subtarefa).subscribe({
        next: () => console.log(`Subtarefa ${subtarefa.titulo} finalizada com sucesso!`),
        error: erro => this.processarFalha(erro)
      })
    } else {
      this.tarefaService.reabrirSubtarefa(this.tarefa.id, subtarefa.id, subtarefa).subscribe({
        next: () => console.log(`Subtarefa ${subtarefa.titulo} reaberta com sucesso!`),
        error: erro => this.processarFalha(erro)
      })
    }
  }

  fechar() {
    this.dialogRef.close(null)
  }

  private atualizarListaSubtarefas() {
    this.tarefaService.SelecionarTodasSubTarefas(this.tarefa.id).subscribe(subtarefas => {
      this.tarefa.subtarefas = (subtarefas || []).filter(s => s != null)
      this.cdr.detectChanges()
    })
  }

  private processarSucesso(registro: any, acao: string) {
    console.log(`SubTarefa ${registro} ${acao} com sucesso!`)
  }

  private processarFalha(erro: Error) {
    console.log(`Erro: ${erro.message}`)
  }
}
