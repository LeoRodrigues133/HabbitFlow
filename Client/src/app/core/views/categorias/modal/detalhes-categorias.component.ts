import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { VisualizarCategoriaViewModel } from '../models/categoria.models';
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-detalhes-categorias',
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterLink],
  templateUrl: './detalhes-categorias.component.html',
  styleUrl: './detalhes-categorias.component.scss'
})
export class DetalhesCategoriasComponent {
  constructor(
    private dialogRef: MatDialogRef<DetalhesCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: VisualizarCategoriaViewModel
  ) { }

  fechar() {
    this.dialogRef.close(null);
  }
}
