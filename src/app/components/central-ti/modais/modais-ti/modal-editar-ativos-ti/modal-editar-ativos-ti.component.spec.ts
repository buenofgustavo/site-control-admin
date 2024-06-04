import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAtivosTiComponent } from './modal-editar-ativos-ti.component';

describe('ModalEditarAtivosTiComponent', () => {
  let component: ModalEditarAtivosTiComponent;
  let fixture: ComponentFixture<ModalEditarAtivosTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarAtivosTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarAtivosTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
