import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../../services/estacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecimenService } from '../../../../services/especimen.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-editar-estacion',
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent],
  templateUrl: './editar-estacion.component.html',
  styleUrl: './editar-estacion.component.css'
})
export class EditarEstacionComponent implements OnInit {
  public estacion: any = {  especimen:[]};
 id: any = {};
 public especimenes: any[] = [];

 compareEspecimenes(r1: any, r2: any): boolean {
  return r1 && r2 ? r1.id === r2.id : r1 === r2;
}

constructor(
  private estacionService: EstacionService,
  private route: ActivatedRoute, 
  private router: Router, 
  private especimenService: EspecimenService,
  private http: HttpClient
) {}

ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.estacionService.obtenerEstacion(this.id).subscribe(
      (dato:any) => {
        this.estacion = dato;
        console.log(this.estacion);
      },
      (error) => {
        console.log(error);
      }
    )
    this.especimenService.listarEspecimenes().subscribe(
      (dato:any) => {
        this.especimenes = dato;
        console.log(this.especimenes);
      },
      (error) => {
        console.log(error);
      }
    )
  
}


public actualizarEstacion(){


  const payload = {
    id: this.estacion.id,
    nombre: this.estacion.nombre,
    numero: this.estacion.numero,
    latitud: this.estacion.latitud,
    longitud: this.estacion.longitud,
    especimenes: this.estacion.especimenes,
    elementoInteractivo: this.estacion.elementoInteractivo,

  };
 this.estacionService.guardarEstacion(payload).subscribe(
      (data) => {
        Swal.fire('Estacion actualizado', 'La estacion ha sido actualizado con éxito', 'success').then(() => {
          this.router.navigate(['/listar-estacion']);
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar la estacion', 'error');
        console.log(error);
      }
    );

}
}
