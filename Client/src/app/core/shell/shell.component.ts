import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { acordionNavegacao, itemAcordionNavegacao, LinkNavegacao } from './models/Link-navegacao.model';
import { UsuarioTokenViewModel } from '../auth/models/auth.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoriaService } from '../views/categorias/categoria.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatExpansionModule,
    NgIf
  ]
})
export class ShellComponent implements OnInit {
  title = 'HabbitFlow';
  @Input() usuarioAutenticado?: UsuarioTokenViewModel;
  @Output() logout: EventEmitter<void>;
  Links: LinkNavegacao[] = [
    {
      titulo: 'Login',
      icone: 'login',
      rota: '/login',
    },
    {
      titulo: 'Registrar',
      icone: 'person_add',
      rota: '/registrar',
    }
  ];

  LinksAuteticados: LinkNavegacao[] = [
    {
      titulo: 'Dashboard',
      icone: 'home',
      rota: '/dashboard',
    }
  ];

  acordionLinks: itemAcordionNavegacao[] = [
    {
      titulo: 'Compras',
      rota: '/compras'
    },
    {
      titulo: 'Estudos',
      rota: '/estudos'
    },
    {
      titulo: 'Academia',
      rota: '/academia'
    }
  ];

  Acordion: acordionNavegacao[] = [
    {
      titulo: 'Categorias',
      icone: 'booksmark',
      items: this.acordionLinks
    }
  ];
  
  Categorias?: string[];

  ngOnInit() {
    this.categoriaService.categorias$.subscribe(categorias => {
      this.Categorias = categorias;
    });
  }


  constructor(private categoriaService: CategoriaService) {
    this.logout = new EventEmitter();
  }


  logoutEfetuado() {
    this.logout.emit();
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}


