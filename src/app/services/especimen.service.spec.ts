import { TestBed } from '@angular/core/testing';

import { EspecimenService } from './especimen.service';

describe('EspecimenService', () => {
  let service: EspecimenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecimenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
