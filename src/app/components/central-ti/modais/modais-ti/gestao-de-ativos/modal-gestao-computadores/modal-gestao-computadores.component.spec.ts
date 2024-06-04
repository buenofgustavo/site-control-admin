import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoComputadoresComponent } from './modal-gestao-computadores.component';

describe('ModalGestaoComputadoresComponent', () => {
  let component: ModalGestaoComputadoresComponent;
  let fixture: ComponentFixture<ModalGestaoComputadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoComputadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoComputadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
