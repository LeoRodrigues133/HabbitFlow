import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesSubtarefasComponent } from './detalhes-subtarefas.component';

describe('DetalhesSubtarefasComponent', () => {
  let component: DetalhesSubtarefasComponent;
  let fixture: ComponentFixture<DetalhesSubtarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesSubtarefasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesSubtarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
