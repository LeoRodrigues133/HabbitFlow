import { ResolveFn } from "@angular/router";
import { ListarContatoViewModel } from "./models/contato.models";
import { inject } from "@angular/core";
import { ContatoService } from "./services/contato.service";

export const listagemContatoResolver: ResolveFn<
ListarContatoViewModel[]> = () => {
  return inject(ContatoService).selecionarTodos();
}
