import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoFrigobarComponent } from './modal-gestao-frigobar.component';

describe('ModalGestaoFrigobarComponent', () => {
  let component: ModalGestaoFrigobarComponent;
  let fixture: ComponentFixture<ModalGestaoFrigobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoFrigobarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoFrigobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
