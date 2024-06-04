import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradoresDpComponent } from './modal-colaboradores-dp.component';

describe('ModalColaboradoresDpComponent', () => {
  let component: ModalColaboradoresDpComponent;
  let fixture: ComponentFixture<ModalColaboradoresDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboradoresDpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalColaboradoresDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
