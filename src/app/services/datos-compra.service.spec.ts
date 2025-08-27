import { TestBed } from '@angular/core/testing';
import { DatosCompraService } from './datos-compra.service';

describe('DatosCompraService', () => {

  //

  let service: DatosCompraService;

  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      })
    };
  })();

  beforeEach(() => {
  
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCompraService);

  
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería guardar datos en localStorage', () => {
    const mockForm = { nombre: 'Juan', email: 'juan@example.com' };
    service.guardarDatos(mockForm);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'formData',
      JSON.stringify(mockForm)
    );
  });

  it('debería obtener los datos guardados de localStorage', () => {
    const mockForm = { nombre: 'Ana', email: 'ana@example.com' };
    localStorage.setItem('formData', JSON.stringify(mockForm));

    const datos = service.obtenerDatos();
    expect(localStorage.getItem).toHaveBeenCalledWith('formData');
    expect(datos).toEqual(mockForm);
  });

  it('debería retornar null si no hay datos en localStorage', () => {
    localStorage.removeItem('formData');
    const datos = service.obtenerDatos();
    expect(datos).toBeNull();
  });

  it('debería borrar los datos del localStorage', () => {
    localStorage.setItem('formData', JSON.stringify({ test: 'data' }));
    service.borrarDatos();

    expect(localStorage.removeItem).toHaveBeenCalledWith('formData');
  });
});
