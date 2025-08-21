import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegistrarUsuarioViewModel } from '../../models/auth.models';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-registrar',
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
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: userService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public Registrar() {
    if (this.form.invalid) return;
    const registro: RegistrarUsuarioViewModel = this.form.value;

    this.authService.registrar(registro).subscribe((x) => {
      this.userService.logarUsuario(x.usuario)

      this.router.navigate(['/dashboard']);
    });
  }

  get nome() {
    return this.form.get('nome')
  }

  get login() {
    return this.form.get('login')
  }

  get email() {
    return this.form.get('email')
  }

  get senha() {
    return this.form.get('senha')
  }
}
