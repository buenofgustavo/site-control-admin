import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoComputadorComponent } from './gestao-computador.component';

describe('GestaoComputadorComponent', () => {
  let component: GestaoComputadorComponent;
  let fixture: ComponentFixture<GestaoComputadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoComputadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoComputadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
