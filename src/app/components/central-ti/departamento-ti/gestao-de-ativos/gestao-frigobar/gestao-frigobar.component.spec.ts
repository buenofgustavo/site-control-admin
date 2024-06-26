import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoFrigobarComponent } from './gestao-frigobar.component';

describe('GestaoFrigobarComponent', () => {
  let component: GestaoFrigobarComponent;
  let fixture: ComponentFixture<GestaoFrigobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoFrigobarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoFrigobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
