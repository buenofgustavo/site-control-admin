import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoArCondicionadoComponent } from './modal-gestao-ar-condicionado.component';

describe('ModalGestaoArCondicionadoComponent', () => {
  let component: ModalGestaoArCondicionadoComponent;
  let fixture: ComponentFixture<ModalGestaoArCondicionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoArCondicionadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoArCondicionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
