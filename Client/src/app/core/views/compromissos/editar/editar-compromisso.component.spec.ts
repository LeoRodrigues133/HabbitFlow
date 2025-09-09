import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCompromissoComponent } from './editar-compromisso.component';

describe('EditarCompromissoComponent', () => {
  let component: EditarCompromissoComponent;
  let fixture: ComponentFixture<EditarCompromissoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCompromissoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
