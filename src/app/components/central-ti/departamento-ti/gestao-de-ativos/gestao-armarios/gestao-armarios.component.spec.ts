import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoArmariosComponent } from './gestao-armarios.component';

describe('GestaoArmariosComponent', () => {
  let component: GestaoArmariosComponent;
  let fixture: ComponentFixture<GestaoArmariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoArmariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoArmariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
