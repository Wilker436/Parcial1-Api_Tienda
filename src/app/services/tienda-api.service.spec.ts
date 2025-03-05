import { TestBed } from '@angular/core/testing';

import { TiendaApiService } from './tienda-api.service';

describe('TiendaApiService', () => {
  let service: TiendaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiendaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
