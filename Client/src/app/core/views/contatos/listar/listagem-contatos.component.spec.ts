import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemContatosComponent } from './listagem-contatos.component';

describe('ListagemContatosComponent', () => {
  let component: ListagemContatosComponent;
  let fixture: ComponentFixture<ListagemContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemContatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
