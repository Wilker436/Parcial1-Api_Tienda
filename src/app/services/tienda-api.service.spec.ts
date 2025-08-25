import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.prod';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TiendaApiService } from './tienda-api.service';


describe('TiendaApiService', () => {
  let service: TiendaApiService;
   let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TiendaApiService]
    });
    service = TestBed.inject(TiendaApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener productos (getProducts)', () => {
    const dummyProducts = [
      { id: 1, name: 'Producto 1' },
      { id: 2, name: 'Producto 2' }
    ];

    service.getProducts().subscribe(products => {
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(environment.BaseUrl + environment.EndPoint);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts); // simula la respuesta del servidor
  });


  it('debería obtener producto por id (getProductsById)', () => {
    const dummyProduct = { id: 1, name: 'Producto 1' };

    service.getProductsById('1').subscribe(product => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(environment.BaseUrl + environment.EndPoint + '1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });


});
