import { Injectable } from '@angular/core';
import { TokenViewModel } from '../models/auth.models';

@Injectable()
export class LocalStorageService {
  private readonly chave: string = 'HabbitFlow.Token';

  constructor() { }

  public salvarTokenAutenticacao(token: TokenViewModel): void {
    const jsonString = JSON.stringify(token);

    localStorage.setItem(this.chave, jsonString);
  }

  public obterTokenAutenticacao(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chave);

    if (jsonString)
      return JSON.parse(jsonString) as TokenViewModel;

    return undefined;
  }

  public limparDadosLocais(): void {
    localStorage.removeItem(this.chave);
  }
}
