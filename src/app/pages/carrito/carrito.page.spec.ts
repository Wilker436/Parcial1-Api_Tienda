import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';


// Creamos mocks simples para los servicios
class MockCarritoService {}
class MockAnimationCtrl {}
class MockToastController {}
class MockRouter {}
class MockDatosCompraService {}

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;

  beforeEach( async() => {

    await TestBed.configureTestingModule({
      declarations: [CarritoPage],
      providers: [
        { provide: MockCarritoService, useClass: MockCarritoService },
        { provide: MockAnimationCtrl, useClass: MockAnimationCtrl },
        { provide: MockToastController, useClass: MockToastController },
        { provide: MockRouter, useClass: MockRouter },
        { provide: MockDatosCompraService, useClass: MockDatosCompraService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería calcular el total correctamente', () => {
    component.products = [
      { price: 100, cantidad: 2 }, // 200
      { price: 50, cantidad: 1 }   // 50
    ];

    const total = component.getTotal();

    expect(total).toBe(290); // subtotal 250 + 40 de impuestos
  });

});
