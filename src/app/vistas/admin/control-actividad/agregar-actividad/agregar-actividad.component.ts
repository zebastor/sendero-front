import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActividadService } from '../../../../services/actividad.service';
import { EstacionService } from '../../../../services/estacion.service';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-agregar-actividad',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './agregar-actividad.component.html',
  styleUrl: './agregar-actividad.component.css'
})
export class AgregarActividadComponent implements OnInit {
  public actividad: any = { fecha:'',titulo:'',estacion:{}, usuarios: [] };


  public usuarios: any[] = [];
  id: any = {};
  public estaciones: any[] = [];

  constructor(
   private actividadService: ActividadService,
   private route: ActivatedRoute, 
  private router: Router, 
   private estacionService: EstacionService,
     private http: HttpClient,
    private userService: UserService,

  ) {}

  formatearFechaLocal(fecha: string | Date): string {
    const d = new Date(fecha);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); // meses en 0-11, se suma 1
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  
    
    // Carga de estaciones y usuarios...
    this.estacionService.listarEstaciones().subscribe(
      (data: any) => {
        this.estaciones = data;
        console.log(this.estaciones);
      },
      (error) => {
        console.log(error);
      }
    );
  
    this.userService.listarUsuarios().subscribe(
      (data: any) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  




  public agregarActividad() {
    // Convierte la fecha local a un objeto Date interpretándolo como hora local.
    // Luego usa toISOString() para obtener la representación en UTC.
    const fechaUTC = new Date(this.actividad.fecha).toISOString();
  
    const payload = {
      
      titulo: this.actividad.titulo,
      fecha: fechaUTC,
      estacion: this.actividad.estacion,
      usuarios: this.actividad.usuarios.map((user: any) => ({ id: user.id }))
    };
  
    this.actividadService.añadirActividad(payload).subscribe(
      (data) => {
        Swal.fire('Actividad actualizada', 'La actividad ha sido actualizada con éxito', 'success')
        .then(() => {
          this.router.navigate(['/listar-actividad']);
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar la actividad', 'error');
        console.log(error);
      }
    );
  }

}
