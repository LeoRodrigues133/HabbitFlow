import { Routes } from '@angular/router';
import { DashboardComponent } from './core/views/dashboard/dashboard.component';
import { RegistrarComponent } from './core/auth/views/registrar/registrar.component';
import { AutenticacaoComponent } from './core/auth/views/autenticacao/autenticacao.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'registrar', component: RegistrarComponent },
  { path: 'login', component: AutenticacaoComponent }
];
