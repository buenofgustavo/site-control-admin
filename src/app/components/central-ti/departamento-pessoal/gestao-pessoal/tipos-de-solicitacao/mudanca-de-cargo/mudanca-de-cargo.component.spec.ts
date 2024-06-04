import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MudancaDeCargoComponent } from './mudanca-de-cargo.component';

describe('MudancaDeCargoComponent', () => {
  let component: MudancaDeCargoComponent;
  let fixture: ComponentFixture<MudancaDeCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MudancaDeCargoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MudancaDeCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
