import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresDpComponent } from './colaboradores-dp.component';

describe('ColaboradoresDpComponent', () => {
  let component: ColaboradoresDpComponent;
  let fixture: ComponentFixture<ColaboradoresDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradoresDpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboradoresDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
