import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCompromissosComponent } from './listagem-compromissos.component';

describe('ListagemCompromissosComponent', () => {
  let component: ListagemCompromissosComponent;
  let fixture: ComponentFixture<ListagemCompromissosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemCompromissosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemCompromissosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
