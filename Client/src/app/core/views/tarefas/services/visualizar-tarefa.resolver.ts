import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { VisualizarTarefaViewModel } from "../models/tarefa.models";
import { inject } from "@angular/core";
import { TarefaService } from "./tarefa.service";
import { map } from "rxjs";

export const visualizarTarefaResolver:
  ResolveFn<VisualizarTarefaViewModel> = (route: ActivatedRouteSnapshot) => {
    const id = route.params['id'];

    return inject(TarefaService).selecionarPorId(id);
  }
