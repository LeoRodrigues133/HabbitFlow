import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { ListarContatoViewModel } from "../models/contato.models";
import { ContatoService } from "./contato.service";

export const listagemContatoResolver: ResolveFn<
ListarContatoViewModel[]> = () => {
  return inject(ContatoService).selecionarTodos();
}
