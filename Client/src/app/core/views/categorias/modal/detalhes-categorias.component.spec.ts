import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCategoriasComponent } from './detalhes-categorias.component';

describe('DetalhesCategoriasComponent', () => {
  let component: DetalhesCategoriasComponent;
  let fixture: ComponentFixture<DetalhesCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
