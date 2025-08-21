import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemTarefasComponent } from './listagem-tarefas.component';

describe('ListagemTarefasComponent', () => {
  let component: ListagemTarefasComponent;
  let fixture: ComponentFixture<ListagemTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemTarefasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
