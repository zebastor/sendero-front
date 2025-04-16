import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import Swal from 'sweetalert2';
import { ActividadService } from '../../../services/actividad.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividad',
  imports: [HeaderComponent, CommonModule,FormsModule],
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.css'
})
export class ActividadComponent implements OnInit {

  isLoggedIn = false;
  user: any = null;
  actividades: any = [];
  actividadesDisponibles: any = []; // Actividades con fecha posterior a la actual

  constructor(
    private actividadService: ActividadService,
    public login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarActividades();

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    this.login.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.cargarActividades();
    });
  }

  // Método para cargar actividades y filtrar las futuras
  cargarActividades() {
    this.actividadService.listarActividades().subscribe(
      (dato: any) => {
        // Convertir cada fecha a Date y almacenar en 'actividades'
        this.actividades = dato.map((actividad: any) => {
          actividad.fecha = new Date(actividad.fecha);
          return actividad;
        });
        // Filtrar las actividades cuya fecha es posterior a la fecha actual
        const ahora = new Date();
        this.actividadesDisponibles = this.actividades.filter((actividad: any) => actividad.fecha > ahora);
        console.log('Actividades disponibles:', this.actividadesDisponibles);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las actividades', 'error');
      }
    );
  }

  // Función que verifica si el usuario logueado ya está inscrito en una actividad
  isUsuarioInscrito(actividad: any): boolean {
    if (!actividad.usuarios || !this.user) return false;
    return actividad.usuarios.some((u: any) => u.id === this.user.id);
  }

  // Método para inscribir al usuario en la actividad
  agregarUsuarioActividad(id: any) {
    Swal.fire({
      title: 'Inscribirse a Actividad',
      text: '¿Estás seguro de inscribirse a la actividad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadService.agregarUsuarioActividad(id, this.user.id).subscribe(
          (data) => {
            Swal.fire('Agregado', 'Has sido agregado a la actividad', 'success');
            this.cargarActividades();  // Actualiza las actividades luego de la inscripción
          },
          (error) => {
            Swal.fire('Error', 'Error al agregarte a la actividad', 'error');
          }
        );
      }
    });
  }

  // Método para cancelar la inscripción
  cancelarUsuarioActividad(id: any) {
    Swal.fire({
      title: 'Cancelar Inscripción',
      text: '¿Estás seguro de cancelar tu inscripción en la actividad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancelar inscripción',
      cancelButtonText: 'Mantener inscripción'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadService.quitarUsuarioActividad(id, this.user.id).subscribe(
          (data) => {
            Swal.fire('Inscripción cancelada', 'Has cancelado tu inscripción a la actividad', 'success');
            this.cargarActividades();  // Actualiza la lista de actividades
          },
          (error) => {
            Swal.fire('Error', 'Error al cancelar la inscripción en la actividad', 'error');
          }
        );
      }
    });
  }
}
