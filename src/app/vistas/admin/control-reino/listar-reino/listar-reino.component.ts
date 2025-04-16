import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { ReinoService } from '../../../../services/reino.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-reino',
  imports: [CommonModule, FormsModule,HeaderComponent, RouterModule],
  templateUrl: './listar-reino.component.html',
  styleUrl: './listar-reino.component.css'
})
export class ListarReinoComponent implements OnInit {
  public reinos: any[] = [];

  constructor(private reinoService: ReinoService) {}

  ngOnInit(): void {
    this.reinoService.listarReinos().subscribe(
      (dato:any) => {
        this.reinos = dato;
        console.log(this.reinos);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar las estaciones','error');
      }
    )
  }

 
   eliminarReino(id:any){
     Swal.fire({
       title:'Eliminar Estacion',
       text:'¿Estás seguro de eliminar la estacion?',
       icon:'warning',
       showCancelButton:true,
       confirmButtonColor:'#3085d6',
       cancelButtonColor:'#d33',
       confirmButtonText:'Eliminar',
       cancelButtonText:'Cancelar'
     }).then((result) => {
       if(result.isConfirmed){
         this.reinoService.eliminarReino(id).subscribe(
           (data) => {
             this.reinos = this.reinos.filter((reino:any) => reino.id != id);
             Swal.fire('Estacion eliminada','La estacion ha sido eliminada de la base de datos','success');
           },
           (error) => {
             Swal.fire('Error','Error al eliminar la estacion, revisa que no hayan especimenes asociados a este reino','error');
           }
         )
       }
     })
   }

}
