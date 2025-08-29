import { CanMatchFn, Router, Routes, UrlTree } from '@angular/router';
import { DashboardComponent } from './core/views/dashboard/dashboard.component';
import { RegistrarComponent } from './core/auth/views/registrar/registrar.component';
import { AutenticacaoComponent } from './core/auth/views/autenticacao/autenticacao.component';
import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { userService } from './core/auth/services/user.service';

const authGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(userService);

  return usuarioService.usuarioAutenticado.pipe(
    map((usuario) => {
      if (!usuario) return router.parseUrl('/login');

      return true;
    })
  );
};


const authUserGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(userService);

  return usuarioService.usuarioAutenticado.pipe(
    map((usuario) => {
      if (usuario) return router.parseUrl('/dashboard');

      return true;
    })
  );
};


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./core/views/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canMatch: [authGuard],
  },

  {
    path: 'registrar',
    loadComponent: () =>
      import('./core/auth/views/registrar/registrar.component').then(
        (c) => c.RegistrarComponent
      ),
    canMatch: [authUserGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/views/autenticacao/autenticacao.component').then(
        (c) => c.AutenticacaoComponent
      ),
    canMatch: [authUserGuard],
  },
  {
    path: 'categoria',
    loadChildren: () =>
      import('./core/views/categorias/categorias.routes').then(
        (m) => m.categoriasRoutes
      ),
    canMatch: [authGuard]
  },
];
