import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoTarefaComponent } from './exclusao-tarefa.component';

describe('ExclusaoTarefaComponent', () => {
  let component: ExclusaoTarefaComponent;
  let fixture: ComponentFixture<ExclusaoTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExclusaoTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExclusaoTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
