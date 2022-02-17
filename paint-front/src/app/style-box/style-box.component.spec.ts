import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleBoxComponent } from './style-box.component';

describe('StyleBoxComponent', () => {
  let component: StyleBoxComponent;
  let fixture: ComponentFixture<StyleBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
