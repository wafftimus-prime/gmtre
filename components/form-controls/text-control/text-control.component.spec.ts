import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriskTextComponent } from './text-control.component';

describe('BriskDateComponent', () => {
  let component: BriskTextComponent;
  let fixture: ComponentFixture<BriskTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriskTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriskTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
