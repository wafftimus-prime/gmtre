import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriskGoogleAddressComponent } from './google-address-control.component';

describe('BriskGoogleAddressComponent', () => {
  let component: BriskGoogleAddressComponent;
  let fixture: ComponentFixture<BriskGoogleAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriskGoogleAddressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriskGoogleAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
