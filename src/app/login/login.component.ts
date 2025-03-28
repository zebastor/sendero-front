import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    const container = document.querySelector('.container') as HTMLElement;
    const registerBtn = document.querySelector('.register-btn') as HTMLElement;
    const loginBtn = document.querySelector('.login-btn') as HTMLElement;
    
    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });
    
    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
  }

////


public user = {
    username: '',
    password: '',
    nombre: '',
    email: '',
    
  };

  constructor(private userService: UserService, private loginService:LoginService, private router: Router) { }



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


  /////

  loginData = {
    "username" : '',
    "password" : '',
  }



  formLogin(){


    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de usuario es requerido !!'
      });
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La clave es requerida !!'
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == 'ADMIN'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['admin-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'NORMAL'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        })
      },(error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error en el sistema !!'
        });
      }
    )
  }
}

