import { DatePipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-listagem-compromissos',
  imports: [
    MatListModule,
    MatIcon,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
  ],
  templateUrl: './listagem-compromissos.component.html',
  styleUrl: './listagem-compromissos.component.scss'
})
export class ListagemCompromissosComponent {
  constructor(private datePipe: DatePipe) { }

  formatarData(data: Date): string | null {
    return this.datePipe.transform(data, 'dd/MM/yy HH:mm');
  }

  Compromissos: any[] = [
    {
      titulo: 'Ir treinar',
      data: new Date(Date.UTC(2025, 11, 25, 0, 0, 0, 0))
    },
    {
      titulo: 'Jantar com a nega',
      data: new Date(Date.UTC(2025, 11, 25, 19, 0, 0))
    },
    {
      titulo: 'Aniversário da minha sogra',
      data: new Date(Date.UTC(2025, 11, 27))
    }
  ];
}
