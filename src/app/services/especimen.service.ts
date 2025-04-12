import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecimenService {

  constructor(private httpClient: HttpClient) { }

  public añadirEspecimen(especimen:any){
    return this.httpClient.post(`${baserUrl}/especimen/`,especimen);
  }


  public listarEspecimenes(){
    return this.httpClient.get(`${baserUrl}/especimen/`);
  }

  public eliminarEspecimen(id:any){
    return this.httpClient.delete(`${baserUrl}/especimen/${id}`);
  }

  public obtenerEspecimen(especimen:any){
    return this.httpClient.get(`${baserUrl}/especimen/${especimen}`);
  }

  public guardarEspecimen(id:any){
    return this.httpClient.put(`${baserUrl}/especimen/`,id);
  }

  guardarEspecimenConImagen(formData: FormData) {
    return this.httpClient.post(`${baserUrl}/especimen/`, formData);
  }
}
