import { Component, OnInit } from '@angular/core';
import { EtapaService } from '../../../../services/etapa.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-etapa',
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule],
  templateUrl: './listar-etapa.component.html',
  styleUrl: './listar-etapa.component.css'
})
export class ListarEtapaComponent implements OnInit {
  public etapas: any[] = [];

  constructor(private etapaService: EtapaService) {}

  ngOnInit(): void {
    this.etapaService.listarEtapas().subscribe(
      (dato:any) => {
        this.etapas = dato;
        console.log(this.etapas);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar las etapas','error');
      }
    )
  }

 
   eliminarEtapa(id:any){
     Swal.fire({
       title:'Eliminar Etapa',
       text:'¿Estás seguro de eliminar la etapa?',
       icon:'warning',
       showCancelButton:true,
       confirmButtonColor:'#3085d6',
       cancelButtonColor:'#d33',
       confirmButtonText:'Eliminar',
       cancelButtonText:'Cancelar'
     }).then((result) => {
       if(result.isConfirmed){
         this.etapaService.eliminarEtapa(id).subscribe(
           (data) => {
             this.etapas = this.etapas.filter((etapa:any) => etapa.id != id);
             Swal.fire('Etapa eliminada','La etapa ha sido eliminada de la base de datos','success');
           },
           (error) => {
             Swal.fire('Error','Error al eliminar la etapa, revisa que no hayan especimenes asociados a esta etapa','error');
           }
         )
       }
     })
   }

}
