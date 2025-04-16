import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../../services/estacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecimenService } from '../../../../services/especimen.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-crear-estacion',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './crear-estacion.component.html',
  styleUrl: './crear-estacion.component.css'
})
export class CrearEstacionComponent implements OnInit {
  public estacion: any = {
    nombre: '',
    numero: '',
    latitud: '',
    longitud: '',
    elementoInteractivo: '',
    especimenes: []
  };
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



public CrearEstacion() {
  // Primero, realizamos la verificación de la existencia de la estación por número.
  this.estacionService.obtenerEstacionPorNumero(this.estacion.numero).subscribe(
    (resultado) => {
      console.log('Respuesta de búsqueda:', resultado);

      // Verificamos si resultado es un array o un objeto.
      const existeEstacion = Array.isArray(resultado)
        ? resultado.length > 0
        : !!resultado; // Si no es array, asumimos que si hay valor es que existe.

      if (existeEstacion) {
        Swal.fire('Error', 'Ya existe una estación con ese número', 'error');
      } else {
        // Si no existe, se procede con la creación.
        const payload = {
          nombre: this.estacion.nombre,
          numero: this.estacion.numero,
          latitud: this.estacion.latitud,
          longitud: this.estacion.longitud,
          especimenes: this.estacion.especimenes,
          elementoInteractivo: this.estacion.elementoInteractivo,
        };

        this.estacionService.añadirEstacion(payload).subscribe(
          (data) => {
            Swal.fire('Estación Guardada', 'La estación ha sido guardada con éxito', 'success').then(() => {
              this.router.navigate(['/listar-estacion']);
            });
          },
          (error) => {
            Swal.fire('Error en el sistema', 'No se ha podido agregar la estación', 'error');
            console.log(error);
          }
        );
      }
    },
    (error) => {
      // En caso de error en la verificación, notifica o detén el flujo
      Swal.fire('Error en el sistema', 'Ocurrió un error al verificar la existencia del número', 'error');
      console.log(error);
    }
  );
}


}
