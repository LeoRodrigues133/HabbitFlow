import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TarefaService } from '../services/tarefa.service';
import { EditarTarefaViewModel } from '../models/tarefa.models';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-editar-tarefa',
  imports: [NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './editar-tarefa.component.html',
  styleUrl: './editar-tarefa.component.scss'
})
export class EditarTarefaComponent {
  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private tarefaService: TarefaService,
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

    const registro: EditarTarefaViewModel = this.form.value;

    const id = this.route.snapshot.params['id'];


    this.tarefaService.editar(id, registro).subscribe({
      next: (registro) => this.processarSucesso(registro),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard'])
  }

  private processarSucesso(registro: EditarTarefaViewModel): void {
    console.log(`Categoria ${registro.titulo} cadastrada com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }


  get titulo() {
    return this.form.get('titulo');
  }
}
