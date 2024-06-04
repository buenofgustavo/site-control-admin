import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExclusaoComputadoresTiComponent } from './dialog-exclusao-computadores-ti.component';

describe('DialogExclusaoComputadoresTiComponent', () => {
  let component: DialogExclusaoComputadoresTiComponent;
  let fixture: ComponentFixture<DialogExclusaoComputadoresTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExclusaoComputadoresTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExclusaoComputadoresTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
