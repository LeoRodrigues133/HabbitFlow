import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../services/contato.service';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditarContatoViewModel } from '../models/contato.models';

@Component({
  selector: 'app-editar-contato',
  imports: [
    NgIf,
    RouterLink,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-contato.component.html',
  styleUrl: './editar-contato.component.scss'
})
export class EditarContatoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contatoService: ContatoService
  ) {
    this.form = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      email: ['', [
        Validators.email
      ]],
      telefone: ['', [
        Validators.required,
        Validators.minLength(9)
      ]],
      empresa: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      cargo: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]]
    })

  }

  ngOnInit(): void {
    const contato = this.route.snapshot.data['contato']

    this.form.patchValue(contato);
  }

  public editar() {

    if (this.form.invalid) return;

    const registro: EditarContatoViewModel = this.form.value;

    const id = this.route.snapshot.params['id'];

    this.contatoService.editar(id, registro).subscribe({
      next: (registro) => this.processarSucesso(registro),
      error: (erro) => this.processarFalha(erro)
    });

    this.router.navigate(['/dashboard']);
  }


  get nome() {
    return this.form.get('nome');
  }

  get email() {
    return this.form.get('email');
  }

  get telefone() {
    return this.form.get('telefone');
  }

  get empresa() {
    return this.form.get('empresa');
  }

  get cargo() {
    return this.form.get('cargo');
  }
  private processarSucesso(registro: EditarContatoViewModel): void {
    console.log(`Contato ${registro.nome} editado com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
