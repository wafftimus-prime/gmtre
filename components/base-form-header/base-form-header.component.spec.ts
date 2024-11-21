import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormHeaderComponent } from './base-form-header.component';

describe('BaseFormHeaderComponent', () => {
  let component: BaseFormHeaderComponent;
  let fixture: ComponentFixture<BaseFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseFormHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
