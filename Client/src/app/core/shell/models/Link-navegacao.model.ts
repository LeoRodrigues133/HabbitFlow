export interface LinkNavegacao{
  titulo:string;
  rota: string;
  icone: string;
}

export interface acordionNavegacao{
  titulo:string;
  icone:string;

  items:itemAcordionNavegacao[];
}

export interface itemAcordionNavegacao{
  titulo:string;
  rota:string;
}
