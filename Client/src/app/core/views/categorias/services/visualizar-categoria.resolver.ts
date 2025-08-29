import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { VisualizarCategoriaViewModel } from "../models/categoria.models";
import { inject } from "@angular/core";
import { CategoriaService } from "./categoria.service";

export const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.params['id'];

  return inject(CategoriaService).selecionarPorId(id);
}
