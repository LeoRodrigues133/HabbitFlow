import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarCompromissoComponent } from './cadastrar-compromisso.component';


describe('CadastrarCompromissoComponent', () => {
  let component: CadastrarCompromissoComponent;
  let fixture: ComponentFixture<CadastrarCompromissoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarCompromissoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CadastrarCompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
