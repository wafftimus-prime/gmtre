import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GmtreCommonHeaderComponent } from './header.component';

describe('GmtreCommonHeaderComponent', () => {
  let component: GmtreCommonHeaderComponent;
  let fixture: ComponentFixture<GmtreCommonHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmtreCommonHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GmtreCommonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
