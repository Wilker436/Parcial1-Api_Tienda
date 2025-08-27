import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito.service';

describe('CarritoService (con Jest)', () => {
  let service: CarritoService;

beforeEach(() => {
  TestBed.configureTestingModule({});
  service = TestBed.inject(CarritoService);

  // Mock completo de localStorage
  const store: Record<string, string> = {};

  jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string): string | null => {
    return store[key] || null;
  });

  jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key: string, value: string): void => {
    store[key] = value;
  });

  jest.spyOn(Storage.prototype, 'removeItem').mockImplementation((key: string): void => {
    delete store[key];
  });

  jest.spyOn(Storage.prototype, 'clear').mockImplementation((): void => {
    Object.keys(store).forEach(k => delete store[k]);
  });

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('cargarProductos', () => {
    it('debería cargar productos desde localStorage si existen', (done) => {
      const productosMock = [{ id: 1, nombre: 'Producto 1' }];
      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(productosMock));

      service = new CarritoService();

      service.getCartProducts().subscribe(items => {
        expect(items).toEqual(productosMock);
        done();
      });

      service.getCartItemCount().subscribe(count => {
        expect(count).toBe(1);
      });
    });

    it('debería inicializar vacío si no hay productos en localStorage', (done) => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      service = new CarritoService();

      service.getCartProducts().subscribe(items => {
        expect(items).toEqual([]);
        done();
      });

      service.getCartItemCount().subscribe(count => {
        expect(count).toBe(0);
      });
    });
  });

  describe('addToCart', () => {
    it('debería agregar un producto al carrito', (done) => {
      const producto = { id: 1, nombre: 'Producto 1' };

      service.addToCart(producto);

      service.getCartProducts().subscribe(items => {
        expect(items).toContain(producto);
        done();
      });

      service.getCartItemCount().subscribe(count => {
        expect(count).toBe(1);
      });

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('removeFromCart', () => {
    it('debería eliminar un producto del carrito por id', (done) => {
      const producto1 = { id: 1, nombre: 'Producto 1' };
      const producto2 = { id: 2, nombre: 'Producto 2' };

      service.addToCart(producto1);
      service.addToCart(producto2);

      service.removeFromCart(1);

      service.getCartProducts().subscribe(items => {
        expect(items).toEqual([producto2]);
        done();
      });

      service.getCartItemCount().subscribe(count => {
        expect(count).toBe(1);
      });

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});
