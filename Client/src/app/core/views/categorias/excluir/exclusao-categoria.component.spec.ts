import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoCategoriaComponent } from './exclusao-categoria.component';

describe('ExclusaoCategoriaComponent', () => {
  let component: ExclusaoCategoriaComponent;
  let fixture: ComponentFixture<ExclusaoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExclusaoCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExclusaoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
