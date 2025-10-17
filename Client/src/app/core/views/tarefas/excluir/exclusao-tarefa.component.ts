import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListItemIcon } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { VisualizarTarefaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-exclusao-tarefa',
  imports: [
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListItemIcon
  ],
  templateUrl: './exclusao-tarefa.component.html',
  styleUrl: './exclusao-tarefa.component.scss'
})
export class ExclusaoTarefaComponent {
  Tarefa?: VisualizarTarefaViewModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
  ) {

  }
  ngOnInit(): void {
    this.Tarefa = this.route.snapshot.data['tarefa'];
  }

  excluir() {
    this.tarefaService.excluir(this.Tarefa!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard']);
  }

  private processarSucesso(): void {
    console.log(`Tarefa excluída com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }

}
