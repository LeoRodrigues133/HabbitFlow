import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListItemIcon } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompromissoService } from '../services/compromisso.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VisualizarCompromissoViewModel } from '../models/compromisso.models';

@Component({
  selector: 'app-exclusao-compromisso',
  imports: [
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListItemIcon
  ],
  templateUrl: './exclusao-compromisso.component.html',
  styleUrl: './exclusao-compromisso.component.scss'
})
export class ExclusaoCompromissoComponent implements OnInit {
  Compromisso?: VisualizarCompromissoViewModel;

  ngOnInit(): void {
    this.Compromisso = this.route.snapshot.data['compromisso'];
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compromissoService: CompromissoService,
  ) { }

  excluir() {
    this.compromissoService.excluir(this.Compromisso!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard']);
  }

  private processarSucesso(): void {
    console.log(`Categoria excluída com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }

}
