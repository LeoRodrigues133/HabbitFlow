import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarContatoViewModel } from '../models/contato.models';

@Component({
  selector: 'app-listagem-contatos',
  imports: [
    NgForOf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-contatos.component.html',
  styleUrl: './listagem-contatos.component.scss'
})
export class ListagemContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[] = [];

  constructor(private route:ActivatedRoute) {

  }
  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos']
  }

}
