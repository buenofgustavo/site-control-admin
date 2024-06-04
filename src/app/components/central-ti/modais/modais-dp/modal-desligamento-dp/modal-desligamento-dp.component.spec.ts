import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDesligamentoDpComponent } from './modal-desligamento-dp.component';

describe('ModalDesligamentoDpComponent', () => {
  let component: ModalDesligamentoDpComponent;
  let fixture: ComponentFixture<ModalDesligamentoDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDesligamentoDpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDesligamentoDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
