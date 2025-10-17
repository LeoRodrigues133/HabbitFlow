import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { CadastrarTarefaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria.models';

@Component({
  selector: 'app-cadastrar-tarefa',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrl: './cadastrar-tarefa.component.scss'
})
export class CadastrarTarefaComponent implements OnInit {
  form: FormGroup;
  categorias?: ListarCategoriaViewModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      titulo: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],
      categoriaId: []
    })
  }
  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];
  }

  get titulo() {
    return this.form.get('titulo')
  }

  public cadastrar() {
    if (this.form.invalid) return;

    const registro: CadastrarTarefaViewModel = this.form.value;

    this.tarefaService.cadastrar(registro).subscribe({
      next: (registro) => this.processarSucesso(registro),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard'])
  }

  private processarSucesso(registro: CadastrarTarefaViewModel): void {
    console.log(`Tarefa ${registro.titulo} cadastrada com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
