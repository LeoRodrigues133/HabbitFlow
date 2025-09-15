import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompromissoService } from '../services/compromisso.service';
import { ListarContatoViewModel } from '../../contatos/models/contato.models';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria.models';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EditarCompromissoViewModel, TipoCompromissoEnum } from '../models/compromisso.models';

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
  public contatos: ListarContatoViewModel[] = [];
  public categorias: ListarCategoriaViewModel[] = [];

  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos']
    this.categorias = this.route.snapshot.data['categorias']
    const compromisso = this.route.snapshot.data['compromisso']

    this.form.patchValue({
      ...compromisso,
      data: new Date(compromisso.data).toISOString().substring(0, 10),
      contatoId: compromisso.contatoId,
      categoriaId: compromisso.categoriaId
    })
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

  private processarSucesso(registro: EditarCompromissoViewModel): void {
    console.log(`Categoria ${registro.titulo} cadastrada com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
