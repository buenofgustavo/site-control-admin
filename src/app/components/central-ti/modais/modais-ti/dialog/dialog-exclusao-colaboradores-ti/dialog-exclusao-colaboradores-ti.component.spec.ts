import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExclusaoColaboradoresTiComponent } from './dialog-exclusao-colaboradores-ti.component';

describe('DialogExclusaoColaboradoresTiComponent', () => {
  let component: DialogExclusaoColaboradoresTiComponent;
  let fixture: ComponentFixture<DialogExclusaoColaboradoresTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExclusaoColaboradoresTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExclusaoColaboradoresTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
