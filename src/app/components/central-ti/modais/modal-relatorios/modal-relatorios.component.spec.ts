import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRelatoriosComponent } from './modal-relatorios.component';

describe('ModalRelatoriosComponent', () => {
  let component: ModalRelatoriosComponent;
  let fixture: ComponentFixture<ModalRelatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRelatoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
