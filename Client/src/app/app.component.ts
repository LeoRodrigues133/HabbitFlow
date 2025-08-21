import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShellComponent } from "./core/shell/shell.component";
import { userService } from './core/auth/services/user.service';
import { UsuarioTokenViewModel } from './core/auth/models/auth.models';
import { AuthService } from './core/auth/services/auth.service';
import { LocalStorageService } from './core/auth/services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ShellComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  usuarioAutenticado$?: Observable<UsuarioTokenViewModel | undefined>;

  constructor(
    private router: Router,
    private userService: userService,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.usuarioAutenticado$ = this.userService.usuarioAutenticado;

    const token = this.localStorageService.obterTokenAutenticacao();

    if (!token) return;

    const usuarioAutenticado = token.usuario;
    const dataExpiracaoToken = new Date(token.dataExpiracao);

    const tokenValido =
      this.authService.validarExpiracaoToken(dataExpiracaoToken);

    if (usuarioAutenticado && tokenValido)
      this.userService.logarUsuario(usuarioAutenticado);
  }

  efetuarLogout() {
    this.userService.logout();
    this.authService.logout();
    this.localStorageService.limparDadosLocais();

    this.router.navigate(['/login']);
  }


}
