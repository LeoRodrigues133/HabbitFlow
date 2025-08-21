import { Injectable } from "@angular/core";
import { UsuarioTokenViewModel } from "../models/auth.models";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class userService {
  private usuarioAutenticadoSubject: BehaviorSubject<UsuarioTokenViewModel | undefined>;

  constructor(private router: Router) {
    this.usuarioAutenticadoSubject =
      new BehaviorSubject<UsuarioTokenViewModel | undefined>(undefined);
  }

  public logarUsuario(usuario: UsuarioTokenViewModel): void {
    this.usuarioAutenticadoSubject.next(usuario);
  }

  public logout(): void {
    this.usuarioAutenticadoSubject.next(undefined)

    this.router.navigate(['/login'])
  }

  get usuarioAutenticado() {
    return this.usuarioAutenticadoSubject.asObservable();
  }

}
