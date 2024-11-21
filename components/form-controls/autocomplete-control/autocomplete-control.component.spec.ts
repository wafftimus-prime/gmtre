import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAutocompleteComponent } from './autocomplete-control.component';

describe('SharedAutocompleteComponent', () => {
  let component: SharedAutocompleteComponent;
  let fixture: ComponentFixture<SharedAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedAutocompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
