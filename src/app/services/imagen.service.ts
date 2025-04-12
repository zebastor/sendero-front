import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  constructor(private httpClient: HttpClient) { }

  public añadirImagen(imagen:any){
    return this.httpClient.post(`${baserUrl}/imagen/`,imagen);
  }


  public listarImagenes(){
    return this.httpClient.get(`${baserUrl}/imagen/`);
  }

  public eliminarImagen(id:any){
    return this.httpClient.delete(`${baserUrl}/imagen/${id}`);
  }

  public obtenerImagen(imagen:any){
    return this.httpClient.get(`${baserUrl}/imagen/${imagen}`);
  }

  public guardarImagen(id:any){
    return this.httpClient.put(`${baserUrl}/imagen/`,id);
  }
}
