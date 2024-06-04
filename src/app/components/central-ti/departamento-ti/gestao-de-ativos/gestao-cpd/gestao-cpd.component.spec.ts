import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoCpdComponent } from './gestao-cpd.component';

describe('GestaoCpdComponent', () => {
  let component: GestaoCpdComponent;
  let fixture: ComponentFixture<GestaoCpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoCpdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoCpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
