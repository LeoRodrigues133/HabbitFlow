import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListItemIcon } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VizualiarContatoViewModel } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-exclusao-contato',
  imports: [[
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListItemIcon
  ]],
  templateUrl: './exclusao-contato.component.html',
  styleUrl: './exclusao-contato.component.scss'
})
export class ExclusaoContatoComponent implements OnInit {
  Contato?: VizualiarContatoViewModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contatoService: ContatoService,
  ) {

  }
  ngOnInit(): void {
    this.Contato = this.route.snapshot.data['contato'];
  }

  excluir() {
    this.contatoService.excluir(this.Contato!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard']);
  }

  private processarSucesso(): void {
    console.log(`Contato excluído com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
