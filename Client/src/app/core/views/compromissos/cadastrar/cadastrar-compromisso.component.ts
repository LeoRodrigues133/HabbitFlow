import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompromissoService } from '../services/compromisso.service';
import { CadastrarCompromissoViewModel, TipoCompromissoEnum } from '../models/compromisso.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListarContatoViewModel } from '../../contatos/models/contato.models';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria.models';

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
    MatSelectModule,

  ],
  templateUrl: './cadastrar-compromisso.component.html',
  styleUrl: './cadastrar-compromisso.component.scss'
})
export class CadastrarCompromissoComponent implements OnInit {
  public form: FormGroup;
  public contatos: ListarContatoViewModel[] = [];
  public categorias: ListarCategoriaViewModel[] = [];

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
      tipo: [0, [Validators.required]],
      local: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]],
      data: [new Date().toISOString().substring(0, 10)],
      hora:
        [null],
      contatoId: [],
      categoriaId: []
    });
  }

  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos'];
    this.categorias = this.route.snapshot.data['categorias'];
  }

  cadastrar() {
    if (this.form.invalid) return;

    const registro: CadastrarCompromissoViewModel = this.form.value;

    this.compromissoService.cadastrar(registro).subscribe({
      next: (registro) => this.processarSucesso(registro),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard']);
  }

  public opcoesLocal = Object.values(TipoCompromissoEnum).filter(
    (v) => !Number.isFinite(v)
  );

  get titulo() {
    return this.form.get('titulo');
  }

  get conteudo() {
    return this.form.get('conteudo');
  }


  get tipo() {
    return this.form.get('tipo');
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
    console.log(`Compromisso ${registro.titulo} cadastrado com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
