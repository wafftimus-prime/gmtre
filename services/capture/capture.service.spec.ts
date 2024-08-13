import { TestBed } from '@angular/core/testing';

import { GmtreCaptureService } from './capture.service';

describe('GmtreCaptureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GmtreCaptureService = TestBed.get(GmtreCaptureService);
    expect(service).toBeTruthy();
  });
});
