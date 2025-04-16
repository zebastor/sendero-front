import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstacionService } from '../../../services/estacion.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-user-dashboard',
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  styles: [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
})
export class UserDashboardComponent  implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  user: any = null;

estaciones : any = []




  constructor(public login: LoginService, private router: Router, private estacionService: EstacionService) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }


  mostrarEstaciones: boolean = false;

  toggleEstaciones() {
    this.mostrarEstaciones = !this.mostrarEstaciones;


    document.body.style.overflow = this.mostrarEstaciones ? 'hidden' : '';
  }


  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });


    this.estacionService.listarEstaciones().subscribe(
      (dato:any) => {
        this.estaciones = dato.sort((a: any, b: any) => a.numero - b.numero);

        console.log(this.estaciones);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar las estaciones','error');
      }
    )
  }

  public logout() {
    this.login.logout();
    this.router.navigate(['']);
  }



 

}
