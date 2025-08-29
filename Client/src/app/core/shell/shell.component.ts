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
import { CategoriaService } from '../views/categorias/services/categoria.service';
import { ListarCategoriaViewModel } from '../views/categorias/models/categoria.models';
import { DetalhesCategoriasComponent } from '../views/categorias/modal/detalhes-categorias.component';
import { MatDialog } from '@angular/material/dialog';

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

  Categorias?: ListarCategoriaViewModel[];
  drawer: any;

  ngOnInit() {
    this.categoriaService.categorias$.subscribe(categorias => {
      this.Categorias = categorias;

      console.log(`Shell: ${this.Categorias.map(x => x.titulo)}`)
    });

    if (!this.Categorias?.length) {
      this.categoriaService.selecionarTodos().subscribe(categorias => {
        this.Categorias = categorias;
      })
    }

  }


  constructor(private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {
    this.logout = new EventEmitter();
  }


  logoutEfetuado() {
    this.logout.emit();
  }

  // Modificar isso aqui depois
  abrirModal(categoria: any) {
    const dialogRef = this.dialog.open(DetalhesCategoriasComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '80vw',
      maxHeight: '70vh',
      data: categoria
    });
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}


