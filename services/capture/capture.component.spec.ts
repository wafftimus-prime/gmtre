import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmtreCaptureComponent } from './capture.component';

describe('GmtreCaptureComponent', () => {
  let component: GmtreCaptureComponent;
  let fixture: ComponentFixture<GmtreCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmtreCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmtreCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
