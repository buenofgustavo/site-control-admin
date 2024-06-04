import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarChamadosGeralComponent } from './criar-chamados-geral.component';

describe('CriarChamadosGeralComponent', () => {
  let component: CriarChamadosGeralComponent;
  let fixture: ComponentFixture<CriarChamadosGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarChamadosGeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarChamadosGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
