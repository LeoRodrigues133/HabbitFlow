import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { userService } from '../../services/user.service';
import { AutenticarUsuarioViewModel, TokenViewModel, UsuarioTokenViewModel } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-autenticacao',
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
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.scss'
})
export class AutenticacaoComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: userService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public AutenticarUsuario() {
    if (this.form.invalid) return;

    const usuario: AutenticarUsuarioViewModel = this.form.value;

    this.authService.autenticar(usuario).subscribe({
      next: (loginAutenticado) => this.processarSucesso(loginAutenticado),
      error: (erro) => this.processaErro(erro)
    });
  }

  private processarSucesso(res: TokenViewModel) {
    this.localStorageService.salvarTokenAutenticacao(res);
    this.userService.logarUsuario(res.usuario);

    this.router.navigate(['/dashboard']);
  }

  private processaErro(err: Error) {
    console.log(err.message);
  }

  get login() {
    return this.form.get('login');
  }

  get senha() {
    return this.form.get('senha');
  }
}
