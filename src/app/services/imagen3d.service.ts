import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class Imagen3dService {
  constructor(private httpClient: HttpClient) { }

  public eliminarImagen3d(id:any){
    return this.httpClient.delete(`${baserUrl}/imagen3d/${id}`);
  }
}
