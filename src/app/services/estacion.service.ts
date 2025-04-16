import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  
  constructor(private httpClient: HttpClient) { }

  public añadirEstacion(estacion:any){
    return this.httpClient.post(`${baserUrl}/estacion/`,estacion);
  }

  public listarEstaciones(){
    return this.httpClient.get(`${baserUrl}/estacion/`);
  }

  public eliminarEstacion(id:any){
    return this.httpClient.delete(`${baserUrl}/estacion/${id}`);
  }

  public obtenerEstacion(estacion:any){
    return this.httpClient.get(`${baserUrl}/estacion/${estacion}`);
  }

  obtenerEstacionPorNumero(numero: string | number): Observable<any> {
    return this.httpClient.get<any>(`${baserUrl}/estacion/numero/${numero}`);
  }
  


  public guardarEstacion(id:any){
    return this.httpClient.put(`${baserUrl}/estacion/`,id);
  }
}
