import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../../../services/actividad.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-actividad',
  imports: [HeaderComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './listar-actividad.component.html',
  styleUrl: './listar-actividad.component.css'
})
export class ListarActividadComponent implements OnInit {


  actividades : any = [

  ]

  constructor(private actividadService:ActividadService) { }

  ngOnInit(): void {
    this.actividadService.listarActividades().subscribe(
      (dato:any) => {
        this.actividades = dato.map((actividad: any) => {
          actividad.fecha = new Date(actividad.fecha);
          return actividad;
        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar las actividades','error');
      }
    )
  }

  eliminarActividad(id:any){
    Swal.fire({
      title:'Eliminar Actividad',
      text:'¿Estás seguro de eliminar la actividad?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.actividadService.eliminarActividad(id).subscribe(
          (data) => {
            this.actividades = this.actividades.filter((actividad:any) => actividad.id != id);
            Swal.fire('Actividad eliminada','La actividad ha sido eliminada de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar la actividad','error');
          }
        )
      }
    })
  }
}
