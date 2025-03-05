import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosCompraService {
  private readonly STORAGE_KEY = 'formData';

  guardarDatos(formulario: Record<string, any>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formulario));
  }

  obtenerDatos(): Record<string, any> | null {
    const datosGuardados = localStorage.getItem(this.STORAGE_KEY);
    return datosGuardados ? JSON.parse(datosGuardados) : null;
  }

  borrarDatos(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
