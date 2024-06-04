import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmacaoCadastroComponent } from './dialog-confirmacao-cadastro.component';

describe('DialogConfirmacaoCadastroComponent', () => {
  let component: DialogConfirmacaoCadastroComponent;
  let fixture: ComponentFixture<DialogConfirmacaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmacaoCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
