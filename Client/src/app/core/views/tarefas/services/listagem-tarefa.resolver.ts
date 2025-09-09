import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { TarefaService } from "./tarefa.service";
import { listarTarefaViewModel } from "../models/tarefa.models";

export const listagemTarefaResolver: ResolveFn<
  listarTarefaViewModel[]> = () => {

    return inject(TarefaService).selecionarTodos()
  };
