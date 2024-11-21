import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriskChipListComponent } from './chip-list-control.component';

describe('BriskChipListComponent', () => {
  let component: BriskChipListComponent;
  let fixture: ComponentFixture<BriskChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriskChipListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriskChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
