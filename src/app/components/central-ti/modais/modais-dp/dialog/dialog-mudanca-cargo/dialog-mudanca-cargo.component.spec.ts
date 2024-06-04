import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMudancaCargoComponent } from './dialog-mudanca-cargo.component';

describe('DialogMudancaCargoComponent', () => {
  let component: DialogMudancaCargoComponent;
  let fixture: ComponentFixture<DialogMudancaCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMudancaCargoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMudancaCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
