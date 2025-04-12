import { TestBed } from '@angular/core/testing';

import { Imagen3dService } from './imagen3d.service';

describe('Imagen3dService', () => {
  let service: Imagen3dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Imagen3dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
