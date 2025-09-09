import { Component, Input, OnInit, } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { ListarCategoriaViewModel } from '../categorias/models/categoria.models';
import { CategoriaService } from '../categorias/services/categoria.service';
import { RouterLink } from '@angular/router';
import { CompromissoService } from '../compromissos/services/compromisso.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TarefaService } from '../tarefas/services/tarefa.service';
import { listarTarefaViewModel } from '../tarefas/models/tarefa.models';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatListModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
    MatIconModule,
    RouterLink,
    MatTooltipModule
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  categorias: ListarCategoriaViewModel[] = [];
  compromissos: ListarCategoriaViewModel[] = [];
  tarefas: listarTarefaViewModel[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private compromissoService: CompromissoService,
    private tarefaService: TarefaService) {

  }
  ngOnInit(): void {
    this.categoriaService.selecionarTodos().subscribe(categorias => {

      this.categorias = categorias;
      this.categoriaService.atualizarCategorias(categorias)

      console.log(`Dashboard: ${this.categorias.map(x => x.titulo)}`)
    })

    this.compromissoService.selecionarTodos().subscribe((compromissos: any) => {
      this.compromissos = compromissos
    });

    this.tarefaService.selecionarTodos().subscribe((tarefas: any) => {
      this.tarefas = tarefas;
    });

  }

  //O layout antigo estava me incomodando
}
