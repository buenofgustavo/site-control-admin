import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoMicroondasComponent } from './modal-gestao-microondas.component';

describe('ModalGestaoMicroondasComponent', () => {
  let component: ModalGestaoMicroondasComponent;
  let fixture: ComponentFixture<ModalGestaoMicroondasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoMicroondasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoMicroondasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
