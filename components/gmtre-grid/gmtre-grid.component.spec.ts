import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmtreGridComponent } from './gmtre-grid.component';

describe('GmtreGridComponent', () => {
  let component: GmtreGridComponent;
  let fixture: ComponentFixture<GmtreGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GmtreGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmtreGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
