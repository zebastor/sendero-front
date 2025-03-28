import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true, // Indica que es un componente standalone
  imports: [FormsModule, HttpClientModule], // Se incluyen las dependencias necesarias
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
   
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de usuario es requerido !!'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con éxito en el sistema', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error en el sistema !!'
        });
      }
    );
  }
}
