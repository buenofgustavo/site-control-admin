import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoCpdComponent } from './modal-gestao-cpd.component';

describe('ModalGestaoCpdComponent', () => {
  let component: ModalGestaoCpdComponent;
  let fixture: ComponentFixture<ModalGestaoCpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoCpdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoCpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
