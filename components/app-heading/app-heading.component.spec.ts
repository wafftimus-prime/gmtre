import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppHeadingComponent } from './app-heading.component';

describe('AppHeadingComponent', () => {
  let component: AppHeadingComponent;
  let fixture: ComponentFixture<AppHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppHeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
