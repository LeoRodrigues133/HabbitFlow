import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip'
import { ExcluirCategoriaViewModel, VisualizarCategoriaViewModel } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';
import { MatListItemIcon } from "@angular/material/list";

@Component({
  selector: 'app-exclusao-categoria',
  imports: [
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListItemIcon
  ],
  templateUrl: './exclusao-categoria.component.html',
  styleUrl: './exclusao-categoria.component.scss'
})
export class ExclusaoCategoriaComponent implements OnInit {
  Categoria?: VisualizarCategoriaViewModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
  ) {

  }
  ngOnInit(): void {
    this.Categoria = this.route.snapshot.data['categoria'];
  }

  excluir() {
    this.categoriaService.excluir(this.Categoria!.id).subscribe({
      next: () => {
        this.processarSucesso();

        this.categoriaService.selecionarTodos().subscribe(categorias => {
          this.categoriaService.atualizarCategorias(categorias);

          this.router.navigate(['/dashboard']);
        });
      },
      error: (erro) => this.processarFalha(erro)
    });
  }

  private processarSucesso(): void {
    console.log(`Categoria excluída com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }

}
