import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {


  usuarios : any = [

  ]

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.listarUsuarios().subscribe(
      (dato:any) => {
        this.usuarios = dato;
        console.log(this.usuarios);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar los usuarios','error');
      }
    )
  }

  eliminarUsuario(id:any){
    Swal.fire({
      title:'Eliminar Usuario',
      text:'¿Estás seguro de eliminar el usuario?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.eliminarUsuario(id).subscribe(
          (data) => {
            this.usuarios = this.usuarios.filter((usuario:any) => usuario.id != id);
            Swal.fire('Ususario eliminado','El Usuario ha sido eliminado de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el usuario','error');
          }
        )
      }
    })
  }



  cambiarEstadoUsuario(usuario: any) {
    const nuevoEstado = !usuario.enabled;
    const mensajeAccion = nuevoEstado ? 'desbloquear' : 'bloquear';
  
    Swal.fire({
      title: `${mensajeAccion.charAt(0).toUpperCase() + mensajeAccion.slice(1)} usuario`,
      text: `¿Estás seguro de que deseas ${mensajeAccion} al usuario ${usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: mensajeAccion.charAt(0).toUpperCase() + mensajeAccion.slice(1),
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.actualizarEstadoUsuario(usuario.id, nuevoEstado).subscribe(
          () => {
            usuario.enabled = nuevoEstado;
            Swal.fire(
              `Usuario ${mensajeAccion === 'bloquear' ? 'bloqueado' : 'desbloqueado'}`,
              `El usuario ${usuario.username} ha sido ${mensajeAccion} correctamente.`,
              'success'
            );
          },
          (error) => {
            Swal.fire('Error', `No se pudo ${mensajeAccion} el usuario.`, 'error');
          }
        );
      }
    });
  }
  
}
