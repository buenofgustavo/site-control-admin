import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoOutrosComponent } from './modal-gestao-outros.component';

describe('ModalGestaoOutrosComponent', () => {
  let component: ModalGestaoOutrosComponent;
  let fixture: ComponentFixture<ModalGestaoOutrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoOutrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoOutrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
