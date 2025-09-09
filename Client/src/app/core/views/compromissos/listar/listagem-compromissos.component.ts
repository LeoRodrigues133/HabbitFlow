import { DatePipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarCompromissoViewModel } from '../models/compromisso.models';

@Component({
  selector: 'app-listagem-compromissos',
  imports: [
    NgForOf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    DatePipe
  ],
  templateUrl: './listagem-compromissos.component.html',
  styleUrl: './listagem-compromissos.component.scss'
})
export class ListagemCompromissosComponent implements OnInit {
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.compromissos = this.route.snapshot.data['compromissos']
  }
}
