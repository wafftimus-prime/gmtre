import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppBreadcrumbsComponent } from './app-breadcrumbs.component';

describe('AppBreadcrumbsComponent', () => {
  let component: AppBreadcrumbsComponent;
  let fixture: ComponentFixture<AppBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppBreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
