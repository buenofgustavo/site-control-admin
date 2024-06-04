import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExclusaoChamadosTiComponent } from './dialog-exclusao-chamados-ti.component';

describe('DialogExclusaoChamadosTiComponent', () => {
  let component: DialogExclusaoChamadosTiComponent;
  let fixture: ComponentFixture<DialogExclusaoChamadosTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExclusaoChamadosTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExclusaoChamadosTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
