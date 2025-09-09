import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CadastrarCompromissoViewModel, EditarCompromissoViewModel, TipoLocalizacaoCompromissoEnum } from '../models/compromisso.models';
import { CompromissoService } from '../services/compromisso.service';
import { NgIf, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-editar-compromisso',
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
  templateUrl: './editar-compromisso.component.html',
  styleUrl: './editar-compromisso.component.scss'
})
export class EditarCompromissoComponent implements OnInit {
  public form: FormGroup;


  ngOnInit(): void {
    const compromisso = this.route.snapshot.data['compromisso']

    this.form.patchValue(compromisso);
  }
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

    editar() {
    if (this.form.invalid) return;

    const registro: EditarCompromissoViewModel = this.form.value;

    const id = this.route.snapshot.params['id'];

    this.compromissoService.editar(id, registro).subscribe({
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

  private processarSucesso(registro: EditarCompromissoViewModel): void {
    console.log(`Categoria ${registro.titulo} cadastrada com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
