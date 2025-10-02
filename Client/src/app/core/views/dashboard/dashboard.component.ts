import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from "@angular/material/list";
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TarefaService } from '../tarefas/services/tarefa.service';
import { listarTarefaViewModel } from '../tarefas/models/tarefa.models';
import { CategoriaService } from '../categorias/services/categoria.service';
import { ListarCategoriaViewModel } from '../categorias/models/categoria.models';
import { CompromissoService } from '../compromissos/services/compromisso.service';
import { ListarCompromissoViewModel } from '../compromissos/models/compromisso.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    RouterLink,
    MatTooltipModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  categorias: ListarCategoriaViewModel[] = [];
  compromissos: ListarCompromissoViewModel[] = [];
  tarefas: listarTarefaViewModel[] = [];
  dataSelecionada: Date = new Date();
  eventosDoDia: any[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private compromissoService: CompromissoService,
    private tarefaService: TarefaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.categoriaService.selecionarTodos()
      .subscribe((categorias: ListarCategoriaViewModel[]) => {
        this.categorias = categorias;
        this.categoriaService.atualizarCategorias(categorias);
        this.atualizarVisualCalendar();
      });

    this.compromissoService.selecionarTodos()
      .subscribe((compromissos: ListarCompromissoViewModel[]) => {
        this.compromissos = compromissos;
        this.atualizarVisualCalendar();
      });

    this.tarefaService.selecionarTodos()
      .subscribe((tarefas: listarTarefaViewModel[]) => {
        this.tarefas = tarefas;
      });
  }

  atualizarVisualCalendar(): void {
    this.filtrarEventos(this.dataSelecionada || new Date());
    this.cdr.detectChanges();
  }

  filtrarEventos(data: Date): void {
    const target = new Date(data.getFullYear(), data.getMonth(), data.getDate()).toDateString();

    const compromissosDia = this.compromissos
      .filter(c => new Date(c.data).toDateString() === target)
      .map(c => ({ titulo: c.titulo, hora: c.hora }));


    this.eventosDoDia = [...compromissosDia];
  }
}
