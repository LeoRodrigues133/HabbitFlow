import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoCompromissoComponent } from './exclusao-compromisso.component';

describe('ExclusaoCompromissoComponent', () => {
  let component: ExclusaoCompromissoComponent;
  let fixture: ComponentFixture<ExclusaoCompromissoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExclusaoCompromissoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExclusaoCompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
