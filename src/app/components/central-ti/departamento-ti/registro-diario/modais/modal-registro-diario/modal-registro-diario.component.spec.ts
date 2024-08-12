import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroDiarioComponent } from './modal-registro-diario.component';

describe('ModalRegistroDiarioComponent', () => {
  let component: ModalRegistroDiarioComponent;
  let fixture: ComponentFixture<ModalRegistroDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroDiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegistroDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
