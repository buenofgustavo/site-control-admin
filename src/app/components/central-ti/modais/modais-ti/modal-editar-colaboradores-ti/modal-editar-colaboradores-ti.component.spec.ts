import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarColaboradoresTiComponent } from './modal-editar-colaboradores-ti.component';

describe('ModalEditarColaboradoresTiComponent', () => {
  let component: ModalEditarColaboradoresTiComponent;
  let fixture: ComponentFixture<ModalEditarColaboradoresTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarColaboradoresTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarColaboradoresTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
