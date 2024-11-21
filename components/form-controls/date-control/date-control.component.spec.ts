import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriskDateComponent } from './date-control.component';

describe('BriskDateComponent', () => {
  let component: BriskDateComponent;
  let fixture: ComponentFixture<BriskDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriskDateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriskDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
