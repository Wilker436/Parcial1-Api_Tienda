import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TiendaApiService {

  constructor(private http: HttpClient) { }



  getProducts(){
    return this.http.get(environment.BaseUrl + environment.EndPoint)
  }

  getProductsById(id: string){
    return this.http.get(environment.BaseUrl + environment.EndPoint + id)
  }

  
}
