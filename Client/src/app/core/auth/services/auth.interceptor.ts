import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

//Para funcionar deve usar esse para funcionar nessa versão do angular

export const AuthInterceptorFn: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const chave = localStorageService.obterTokenAutenticacao()?.chave;

  if (chave) {
    console.log('Token:', chave);
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${chave}` },
    });
    return next(authReq);
  }

  return next(req);
};
