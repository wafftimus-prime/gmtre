import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicVerticalMenuComponent } from './ionic-vertical-menu.component';

describe('IonicVerticalMenuComponent', () => {
  let component: IonicVerticalMenuComponent;
  let fixture: ComponentFixture<IonicVerticalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicVerticalMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonicVerticalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
