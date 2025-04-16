import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Si tienes un servicio para roles, lo inyectas; para este ejemplo, definiremos la lista de roles de forma estática
// import { RoleService } from '...';

@Component({
  selector: 'app-editar-usuarios',
  imports: [CommonModule, HeaderComponent, RouterModule, FormsModule],
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  username: any = {};
 public usuario: any = {};
  rolesList: any[] = [
    { rolId: 1, rolNombre: 'ADMIN' },
    { rolId: 2, rolNombre: 'NORMAL' }
  ];




  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
    // private roleService: RoleService // Si se desea cargar desde el backend
  ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.userService.obtenerUsuariox(this.username).subscribe(
      (data) => {
        this.usuario = data;
        // Si el rol no viene asignado, asigna NORMAL por defecto (rolId: 2)
        if (!this.usuario.rolId) {
          this.usuario.rolId = 2;
        }
        // Limpia el password para que el usuario vuelva a digitarlo
        this.usuario.password = '';
        console.log(this.usuario);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  public actualizarDatos() {
    const payload = {
      id: this.usuario.id,
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      username: this.usuario.username,
      password: this.usuario.password,
      rolId: this.usuario.rolId
    };
    this.userService.guardarUsuariox(payload).subscribe(
      (data) => {
        Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado con éxito', 'success').then(() => {
          this.router.navigate(['/usuarios']);
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar el usuario', 'error');
        console.log(error);
      }
    );
  }
  
}
