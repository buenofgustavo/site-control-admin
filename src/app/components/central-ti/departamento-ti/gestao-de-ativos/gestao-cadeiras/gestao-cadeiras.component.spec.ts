import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoCadeirasComponent } from './gestao-cadeiras.component';

describe('GestaoCadeirasComponent', () => {
  let component: GestaoCadeirasComponent;
  let fixture: ComponentFixture<GestaoCadeirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoCadeirasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoCadeirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
