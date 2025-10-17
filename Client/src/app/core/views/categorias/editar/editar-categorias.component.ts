import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { EditarCategoriaViewModel } from '../models/categoria.models';

@Component({
  selector: 'app-editar-categorias',
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
  templateUrl: './editar-categorias.component.html',
  styleUrl: './editar-categorias.component.scss'
})
export class EditarCategoriasComponent implements OnInit {
  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        titulo:
          ['',
            [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40)]
          ]
      });
  }

  ngOnInit(): void {
    const categoria = this.route.snapshot.data['categoria'];

    this.form.patchValue(categoria);
  }

  editar() {
    if (this.form.invalid) return;

    const registro: EditarCategoriaViewModel = this.form.value;

    const id = this.route.snapshot.params['id'];


    this.categoriaService.editar(id, registro).subscribe({
      next: (registro) => this.processarSucesso(registro),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard'])
  }

  private processarSucesso(registro: EditarCategoriaViewModel): void {
    console.log(`Categoria ${registro.titulo} editada com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }


  get titulo() {
    return this.form.get('titulo');
  }
}
