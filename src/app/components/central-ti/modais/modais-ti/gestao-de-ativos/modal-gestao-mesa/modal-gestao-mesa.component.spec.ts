import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoMesaComponent } from './modal-gestao-mesa.component';

describe('ModalGestaoMesaComponent', () => {
  let component: ModalGestaoMesaComponent;
  let fixture: ComponentFixture<ModalGestaoMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
