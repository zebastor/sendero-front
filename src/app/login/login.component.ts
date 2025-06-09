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
    this.setupAccessibility();
    this.setupFormInteraction();
  }

  private setupAccessibility(): void {
    // Anunciar la página para lectores de pantalla
    this.announceToScreenReader('Página de autenticación cargada. Use las pestañas para navegar entre los formularios.');
    
    // Configurar manejo de errores accesible
    this.setupErrorAnnouncements();
  }

  private setupFormInteraction(): void {
    const container = document.querySelector('.container') as HTMLElement;
    const registerBtn = document.querySelector('.register-btn') as HTMLElement;
    const loginBtn = document.querySelector('.login-btn') as HTMLElement;
    
    if (registerBtn && loginBtn && container) {
      registerBtn.addEventListener('click', () => {
        container.classList.add('active');
        this.announceToScreenReader('Formulario de registro activado');
        this.updateTabStates('register');
        
        // Enfocar el primer campo del formulario de registro
        setTimeout(() => {
          const firstInput = document.getElementById('register-username');
          if (firstInput) firstInput.focus();
        }, 300);
      });
      
      loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
        this.announceToScreenReader('Formulario de inicio de sesión activado');
        this.updateTabStates('login');
        
        // Enfocar el primer campo del formulario de login
        setTimeout(() => {
          const firstInput = document.getElementById('login-username');
          if (firstInput) firstInput.focus();
        }, 300);
      });
    }
  }

  private updateTabStates(activeForm: 'login' | 'register'): void {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    
    if (loginTab && registerTab) {
      if (activeForm === 'login') {
        loginTab.setAttribute('aria-selected', 'true');
        registerTab.setAttribute('aria-selected', 'false');
      } else {
        loginTab.setAttribute('aria-selected', 'false');
        registerTab.setAttribute('aria-selected', 'true');
      }
    }
  }

  private setupErrorAnnouncements(): void {
    // Configurar interceptor de SweetAlert para hacerlo accesible
    const originalFire = Swal.fire;
    Swal.fire = (options: any) => {
      // Anunciar errores a lectores de pantalla
      if (typeof options === 'object' && options.icon === 'error') {
        this.announceToScreenReader(`Error: ${options.text || options.title}`);
      } else if (typeof options === 'object' && options.icon === 'success') {
        this.announceToScreenReader(`Éxito: ${options.text || options.title}`);
      }
      
      return originalFire.call(Swal, options);
    };
  }

  private announceToScreenReader(message: string): void {
    const announcement = document.getElementById('status-announcements');
    if (announcement) {
      announcement.textContent = message;
      
      // Limpiar después de un momento
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  }

  private validateForm(formType: 'login' | 'register'): boolean {
    const errors: string[] = [];
    
    if (formType === 'login') {
      if (!this.loginData.username.trim()) {
        errors.push('El nombre de usuario es requerido');
        this.setFieldError('login-username', 'Campo requerido');
      }
      if (!this.loginData.password.trim()) {
        errors.push('La contraseña es requerida');
        this.setFieldError('login-password', 'Campo requerido');
      }
    } else {
      if (!this.user.username.trim()) {
        errors.push('El nombre de usuario es requerido');
        this.setFieldError('register-username', 'Campo requerido');
      }
      if (!this.user.nombre.trim()) {
        errors.push('El nombre es requerido');
        this.setFieldError('register-nombre', 'Campo requerido');
      }
      if (!this.user.email.trim()) {
        errors.push('El correo electrónico es requerido');
        this.setFieldError('register-email', 'Campo requerido');
      }
      if (!this.user.password.trim()) {
        errors.push('La contraseña es requerida');
        this.setFieldError('register-password', 'Campo requerido');
      }
    }

    if (errors.length > 0) {
      this.announceToScreenReader(`Errores en el formulario: ${errors.join(', ')}`);
      return false;
    }

    return true;
  }

  private setFieldError(fieldId: string, errorMessage: string): void {
    const field = document.getElementById(fieldId);
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', `${fieldId}-error`);
      
      // Crear o actualizar mensaje de error
      let errorElement = document.getElementById(`${fieldId}-error`);
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = `${fieldId}-error`;
        errorElement.className = 'error-message';
        errorElement.setAttribute('role', 'alert');
        field.parentNode?.appendChild(errorElement);
      }
      errorElement.textContent = errorMessage;
    }
  }

  private clearFieldError(fieldId: string): void {
    const field = document.getElementById(fieldId);
    if (field) {
      field.setAttribute('aria-invalid', 'false');
      field.removeAttribute('aria-describedby');
      
      const errorElement = document.getElementById(`${fieldId}-error`);
      if (errorElement) {
        errorElement.remove();
      }
    }
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
    
    // Limpiar errores previos
    ['register-username', 'register-nombre', 'register-email', 'register-password']
      .forEach(id => this.clearFieldError(id));
    
    if (!this.validateForm('register')) {
      return;
    }

    this.announceToScreenReader('Procesando registro...');

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        this.announceToScreenReader('Usuario registrado exitosamente');
        Swal.fire('Usuario guardado', 'Usuario registrado con éxito en el sistema', 'success');
      },
      (error) => {
        console.log(error);
        this.announceToScreenReader('Error al registrar usuario');
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
    // Limpiar errores previos
    ['login-username', 'login-password'].forEach(id => this.clearFieldError(id));
    
    if (!this.validateForm('login')) {
      return;
    }

    this.announceToScreenReader('Iniciando sesión...');

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == 'ADMIN'){
            this.announceToScreenReader('Inicio de sesión exitoso. Redirigiendo al panel de administración.');
            this.router.navigate(['admin-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'NORMAL'){
            this.announceToScreenReader('Inicio de sesión exitoso. Redirigiendo al panel de usuario.');
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        })
      },(error) => {
        console.log(error);
        this.announceToScreenReader('Error al iniciar sesión. Verifique sus credenciales.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales incorrectas o error en el sistema'
        });
      }
    )
  }
}

