import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { CadastrarCategoriaViewModel } from '../models/categoria.models';

@Component({
  selector: 'app-cadastrar-categoria',
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './cadastrar-categoria.component.html',
  styleUrl: './cadastrar-categoria.component.scss'
})
export class CadastrarCategoriaComponent {
  form: FormGroup;

  get titulo() {
    return this.form.get('titulo');
  }

  constructor(private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private route: Router
  ) {
    this.form = this.formBuilder.group(
      { titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]] }
    )
  }

  public cadastrar() {
    if (this.form.invalid) return;

    const registro: CadastrarCategoriaViewModel = this.form.value;

    this.categoriaService.cadastrar(registro).subscribe({
      next: (registro) => this.processarSucesso(registro),
      error: (erro) => this.processarFalha(erro)
    });

    this.route.navigate(['/dashboard'])
  }

  private processarSucesso(registro: CadastrarCategoriaViewModel): void {
    console.log(`Categoria ${registro.titulo} cadastrada com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
