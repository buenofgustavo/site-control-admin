import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFeriasDpComponent } from './modal-ferias-dp.component';

describe('ModalFeriasDpComponent', () => {
  let component: ModalFeriasDpComponent;
  let fixture: ComponentFixture<ModalFeriasDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFeriasDpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFeriasDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
