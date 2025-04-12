import { TestBed } from '@angular/core/testing';

import { ReinoService } from './reino.service';

describe('ReinoService', () => {
  let service: ReinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
