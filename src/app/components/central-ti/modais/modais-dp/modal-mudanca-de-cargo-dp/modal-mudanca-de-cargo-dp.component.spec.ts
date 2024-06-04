import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMudancaDeCargoDpComponent } from './modal-mudanca-de-cargo-dp.component';

describe('ModalMudancaDeCargoDpComponent', () => {
  let component: ModalMudancaDeCargoDpComponent;
  let fixture: ComponentFixture<ModalMudancaDeCargoDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMudancaDeCargoDpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMudancaDeCargoDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
