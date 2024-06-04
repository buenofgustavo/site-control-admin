import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoOutrosComponent } from './gestao-outros.component';

describe('GestaoOutrosComponent', () => {
  let component: GestaoOutrosComponent;
  let fixture: ComponentFixture<GestaoOutrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoOutrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoOutrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
