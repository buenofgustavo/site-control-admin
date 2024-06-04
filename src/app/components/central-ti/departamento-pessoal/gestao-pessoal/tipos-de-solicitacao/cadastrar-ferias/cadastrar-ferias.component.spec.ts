import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFeriasComponent } from './cadastrar-ferias.component';

describe('CadastrarFeriasComponent', () => {
  let component: CadastrarFeriasComponent;
  let fixture: ComponentFixture<CadastrarFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarFeriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
