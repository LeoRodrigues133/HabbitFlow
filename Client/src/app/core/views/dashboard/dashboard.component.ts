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
    RouterLink
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private categoriaService: CategoriaService) {

  }
  ngOnInit(): void {
    this.categoriaService.selecionarTodos().subscribe(categorias => {

      this.categorias = categorias;
      this.categoriaService.atualizarCategorias(categorias)

      console.log(`Dashboard: ${this.categorias.map(x => x.titulo)}`)
    })

    // this.compromissoService.selecionarTodos().subscribe((compromissos: any) => {
    //   this.compromissos = compromissos
    // });

    // this.contatoService.selecionarTodo().subscribe((contatos:any) =>{
    //   this.contatos = contatos;
    // });

  }
  categorias: ListarCategoriaViewModel[] = [];
  compromissos: any[] = [1, 2, 3, 4, 5]; // ListarCompromissoViewModel
  contatos: any[] = [1, 2, 3]; //ListarContatoViewModel


  //O layout antigo estava me incomodando
}
