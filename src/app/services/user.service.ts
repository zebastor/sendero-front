import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    }


    public listarUsuarios(){
      return this.httpClient.get(`${baserUrl}/usuarios/`);
    }

    public eliminarUsuario(id:any){
      return this.httpClient.delete(`${baserUrl}/usuario/${id}`);
    }

    public obtenerUsuariox(username:any){
      return this.httpClient.get(`${baserUrl}/usuario/${username}`);
    }

    public guardarUsuariox(username:any){
      return this.httpClient.put(`${baserUrl}/usuario/`,username);
    }

    actualizarEstadoUsuario(id: number, enabled: boolean) {
      return this.httpClient.put(`${baserUrl}/usuarios/${id}/estado`, { enabled });
    }
    

}