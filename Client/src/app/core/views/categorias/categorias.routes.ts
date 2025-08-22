import { Routes } from "@angular/router";
import { CadastrarCategoriaComponent } from "./cadastrar/cadastrar-categoria.component";

export const categoriasRoutes: Routes = [
  {
    path: '',
    component: CadastrarCategoriaComponent,
  }
];
