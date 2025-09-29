import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { ContatoService } from '../services/contato.service';
import { CadastrarContatoViewModel } from '../models/contato.models';

@Component({
  selector: 'app-cadastrar-contato',
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './cadastrar-contato.component.html',
  styleUrl: './cadastrar-contato.component.scss'
})
export class CadastrarContatoComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contatoService: ContatoService) {
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
        Validators.minLength(14),
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

  public cadastrar() {
    if (this.form.invalid) return;

    const registro: CadastrarContatoViewModel = this.form.value;

    this.contatoService.cadastrar(registro).subscribe({
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
  private processarSucesso(registro: CadastrarContatoViewModel): void {
    console.log(`Contato ${registro.nome} cadastrado com sucesso!`)
  }

  private processarFalha(erro: Error): void {
    console.log(`Erro: ${erro.message}`)
  }
}
