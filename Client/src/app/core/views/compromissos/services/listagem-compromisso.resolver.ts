import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CompromissoService } from './compromisso.service';
import { ListarCompromissoViewModel } from '../models/compromisso.models';

export const listagemCompromissoResolver: ResolveFn<
  ListarCompromissoViewModel[]> = () => {
    return inject(CompromissoService).selecionarTodos();
  };
