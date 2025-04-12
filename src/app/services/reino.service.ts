import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ReinoService {


  constructor(private httpClient: HttpClient) { }

  public añadirReino(reino:any){
    return this.httpClient.post(`${baserUrl}/reino/`,reino);
  }


  public listarReinos(){
    return this.httpClient.get(`${baserUrl}/reino/`);
  }

  public eliminarReino(id:any){
    return this.httpClient.delete(`${baserUrl}/reino/${id}`);
  }

  public obtenerReino(reino:any){
    return this.httpClient.get(`${baserUrl}/reino/${reino}`);
  }

  public guardarReino(id:any){
    return this.httpClient.put(`${baserUrl}/reino/`,id);
  }
}
