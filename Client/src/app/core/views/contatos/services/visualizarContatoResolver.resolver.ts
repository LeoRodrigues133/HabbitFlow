import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ListarContatoViewModel } from "../models/contato.models";
import { ContatoService } from "./contato.service";
import { inject } from "@angular/core";

export const visualizarContatoResolver:
  ResolveFn<ListarContatoViewModel> = (route: ActivatedRouteSnapshot) => {
    const id = route.params['id'];

    return inject(ContatoService).selecionarPorId(id);
  }
