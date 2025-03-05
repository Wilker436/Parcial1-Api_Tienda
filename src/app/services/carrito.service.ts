import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productos: any[] = [];
  private cartItems = new BehaviorSubject<any[]>([]); 
  private cartItemCount = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItems.asObservable();
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor() { 
    this.cargarProductos();
  }

  private cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    this.productos = productosGuardados ? JSON.parse(productosGuardados) : []; 
    this.cartItems.next([...this.productos]); 
    this.cartItemCount.next(this.productos.length);
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  getCartProducts() {
    return this.cartItems.asObservable(); 
  }

  addToCart(producto: any) {
    this.productos.push(producto);
    this.actualizarCarrito();
  }

  removeFromCart(productoId: number) {
    this.productos = this.productos.filter(p => p.id !== productoId);
    this.actualizarCarrito();
  }

  clearCart() {
    this.productos = [];
    this.actualizarCarrito();
  }

  private actualizarCarrito() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.cartItems.next([...this.productos]); 
    this.cartItemCount.next(this.productos.length); 
  }
}
