import { TestBed } from '@angular/core/testing';

import { R2servicesService } from './r2services.service';

describe('R2servicesService', () => {
  let service: R2servicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(R2servicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
