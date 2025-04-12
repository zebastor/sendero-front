import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {
  constructor(private httpClient: HttpClient) { }

  public añadirEtapa(etapa:any){
    return this.httpClient.post(`${baserUrl}/etapa/`,etapa);
  }


  public listarEtapas(){
    return this.httpClient.get(`${baserUrl}/etapa/`);
  }

  public eliminarEtapa(id:any){
    return this.httpClient.delete(`${baserUrl}/etapa/${id}`);
  }

  public obteneEtapa(etapa:any){
    return this.httpClient.get(`${baserUrl}/etapa/${etapa}`);
  }

  public guardarEtapa(id:any){
    return this.httpClient.put(`${baserUrl}/etapa/`,id);
  }
}
