import { TestBed } from '@angular/core/testing';

import { DatosCompraService } from './datos-compra.service';

describe('DatosCompraService', () => {
  let service: DatosCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
