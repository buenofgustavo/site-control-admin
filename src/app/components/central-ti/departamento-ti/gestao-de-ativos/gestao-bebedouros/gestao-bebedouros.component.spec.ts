import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoBebedourosComponent } from './gestao-bebedouros.component';

describe('GestaoBebedourosComponent', () => {
  let component: GestaoBebedourosComponent;
  let fixture: ComponentFixture<GestaoBebedourosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoBebedourosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoBebedourosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
