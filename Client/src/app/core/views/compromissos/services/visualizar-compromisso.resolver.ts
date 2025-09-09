import { inject } from "@angular/core";
import { CompromissoService } from "./compromisso.service";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { VisualizarCompromissoViewModel } from "../models/compromisso.models";

export const visualizarCompromissoResolver:
  ResolveFn<VisualizarCompromissoViewModel> = (route: ActivatedRouteSnapshot) => {
    const id = route.params['id'];

    return inject(CompromissoService).selecionarPorId(id);
  }
