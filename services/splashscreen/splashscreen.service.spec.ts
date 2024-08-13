import { TestBed } from '@angular/core/testing';

import { SplashscreenService } from './splashscreen.service';

describe('SplashscreenService', () => {
  let service: SplashscreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplashscreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
