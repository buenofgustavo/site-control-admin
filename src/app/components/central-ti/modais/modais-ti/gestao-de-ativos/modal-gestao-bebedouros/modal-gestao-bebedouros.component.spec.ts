import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoBebedourosComponent } from './modal-gestao-bebedouros.component';

describe('ModalGestaoBebedourosComponent', () => {
  let component: ModalGestaoBebedourosComponent;
  let fixture: ComponentFixture<ModalGestaoBebedourosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoBebedourosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoBebedourosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
