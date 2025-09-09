import { Component } from '@angular/core';
import { NgIf, NgForOf, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompromissoService } from '../services/compromisso.service';
import { CadastrarCompromissoViewModel, TipoLocalizacaoCompromissoEnum } from '../models/compromisso.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-compromisso',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './cadastrar-compromisso.component.html',
  styleUrl: './cadastrar-compromisso.component.scss'
})
export class CadastrarCompromissoComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService
  ) {
    this.form = this.fb.group({
      titulo: [
        '',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
        ]
      ],
      conteudo: [
        '',
        [
          Validators.maxLength(300),
        ],
      ],
      tipoLocal: [0, [Validators.required]],
      local: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]],
      data: [new Date().toISOString().substring(0, 10)],
      hora:
        [null
        ],
      contatoId: [],
      categoriaId: []
    });
  }

    cadastrar() {
    if (this.form.invalid) return;

    const registro: CadastrarCompromissoViewModel = this.form.value;

    console.log(registro)

    this.compromissoService.cadastrar(registro).subscribe({
      next: (registro) => this.processarSucesso(registro),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard']);
  }

  public opcoesLocal = Object.values(TipoLocalizacaoCompromissoEnum).filter(
    (v) => !Number.isFinite(v)
  );

  get titulo() {
    return this.form.get('titulo');
  }

  get conteudo() {
    return this.form.get('conteudo');
  }

  get tipoLocal() {
    return this.form.get('tipoLocal');
  }

  get local() {
    return this.form.get('local');
  }

  get data() {
    return this.form.get('data');
  }

  get hora() {
    return this.form.get('hora');
  }

  private processarSucesso(registro: CadastrarCompromissoViewModel): void {
    console.log(`Categoria ${registro.titulo} cadastrada com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
