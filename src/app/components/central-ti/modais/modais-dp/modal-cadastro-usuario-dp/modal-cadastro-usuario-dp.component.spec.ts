import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroUsuarioDpComponent } from './modal-cadastro-usuario-dp.component';

describe('ModalCadastroUsuarioDpComponent', () => {
  let component: ModalCadastroUsuarioDpComponent;
  let fixture: ComponentFixture<ModalCadastroUsuarioDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroUsuarioDpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroUsuarioDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
