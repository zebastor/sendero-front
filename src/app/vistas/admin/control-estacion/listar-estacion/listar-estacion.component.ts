import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../../services/estacion.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-estacion',
  imports: [HeaderComponent, CommonModule, RouterModule ],
  templateUrl: './listar-estacion.component.html',
  styleUrl: './listar-estacion.component.css'
})
export class ListarEstacionComponent implements OnInit {


  estaciones : any = [

  ]

  constructor(private estacionService:EstacionService) { }

  ngOnInit(): void {
    this.estacionService.listarEstaciones().subscribe(
      (dato:any) => {
        this.estaciones = dato;
        console.log(this.estaciones);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar las estaciones','error');
      }
    )
  }

  eliminarEstacion(id:any){
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
        this.estacionService.eliminarEstacion(id).subscribe(
          (data) => {
            this.estaciones = this.estaciones.filter((estacion:any) => estacion.id != id);
            Swal.fire('Estacion eliminada','La estacion ha sido eliminada de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar la estacion','error');
          }
        )
      }
    })
  }
}
