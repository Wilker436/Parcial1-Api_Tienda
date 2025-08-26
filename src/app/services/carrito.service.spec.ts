import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito.service';

describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoService);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return null;
    });
    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('cargarProductos', () => {
    it('debería cargar productos desde localStorage si existen', () => {
      const productosMock = [{ id: 1, nombre: 'Producto 1' }];
      (localStorage.getItem as jasmine.Spy).and.returnValue(JSON.stringify(productosMock));

      service = new CarritoService();

      service.getCartProducts().subscribe(items => {
        expect(items).toEqual(productosMock);
      });

      service.getCartItemCount().subscribe(count => {
        expect(count).toBe(1);
      });
    });

    it('debería inicializar vacío si no hay productos en localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);

      service = new CarritoService();

      service.getCartProducts().subscribe(items => {
        expect(items).toEqual([]);
      });

      service.getCartItemCount().subscribe(count => {
        expect(count).toBe(0);
      });
    });
  });

  describe('addToCart', () => {
    it('debería agregar un producto al carrito', () => {
      const producto = { id: 1, nombre: 'Producto 1' };

      service.addToCart(producto);

      service.getCartProducts().subscribe(items => {
        expect(items).toContain(producto);
      });

      service.getCartItemCount().subscribe(count => {
        expect(count).toBe(1);
      });

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('removeFromCart', () => {
    it('debería eliminar un producto del carrito por id', () => {
      const producto1 = { id: 1, nombre: 'Producto 1' };
      const producto2 = { id: 2, nombre: 'Producto 2' };

      service.addToCart(producto1);
      service.addToCart(producto2);

      service.removeFromCart(1);

      service.getCartProducts().subscribe(items => {
        expect(items).toEqual([producto2]);
      });

      service.getCartItemCount().subscribe(count => {
        expect(count).toBe(1);
      });

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});
