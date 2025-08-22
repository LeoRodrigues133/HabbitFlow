import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAuthentication } from './core/auth/auth.provider';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AuthInterceptorFn } from './core/auth/services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptorFn])),
    //Para funcionar deve usar esse para funcionar nessa versão do angular
    provideAuthentication(),
    provideNativeDateAdapter(),
    DatePipe,
  ]
};
