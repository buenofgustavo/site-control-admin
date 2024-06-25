import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLogComputadoresComponent } from './modal-log-computadores.component';

describe('ModalLogComputadoresComponent', () => {
  let component: ModalLogComputadoresComponent;
  let fixture: ComponentFixture<ModalLogComputadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLogComputadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLogComputadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
