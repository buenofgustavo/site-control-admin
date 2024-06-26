import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoTransformadorComponent } from './modal-gestao-transformador.component';

describe('ModalGestaoTransformadorComponent', () => {
  let component: ModalGestaoTransformadorComponent;
  let fixture: ComponentFixture<ModalGestaoTransformadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoTransformadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoTransformadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
