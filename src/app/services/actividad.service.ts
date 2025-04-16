import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private httpClient: HttpClient) { }

  public añadirActividad(actividad:any){
    return this.httpClient.post(`${baserUrl}/actividad/`,actividad);
  }

  public listarActividades(){
    return this.httpClient.get(`${baserUrl}/actividad/`);
  }

  public eliminarActividad(id:any){
    return this.httpClient.delete(`${baserUrl}/actividad/${id}`);
  }

  public obtenerActividad(actividad:any){
    return this.httpClient.get(`${baserUrl}/actividad/${actividad}`);
  }


  public guardarActividad(id:any){
    return this.httpClient.put(`${baserUrl}/actividad/`,id);
  }
  // actividad.service.ts
public agregarUsuarioActividad(actividadId: number, usuarioId: number) {
  return this.httpClient.put(`${baserUrl}/actividad/${actividadId}/usuario/${usuarioId}`, {});
}

// Método para quitar al usuario (DELETE en la URL que incluye actividad y usuario)
public quitarUsuarioActividad(actividadId: number, usuarioId: number) {
  return this.httpClient.delete(`${baserUrl}/actividad/${actividadId}/usuario/${usuarioId}`);
}

}
