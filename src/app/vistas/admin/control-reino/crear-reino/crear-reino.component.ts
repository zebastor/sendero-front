import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReinoService } from '../../../../services/reino.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-crear-reino',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './crear-reino.component.html',
  styleUrl: './crear-reino.component.css'
})
export class CrearReinoComponent{
  public reino: any = {nombre:''};
  id: any = {};
  constructor(
    private reinoService: ReinoService,
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient
  ) {}


public crearReino(){


  const payload = {
    id: this.reino.id,
    nombre: this.reino.nombre,

  };
 this.reinoService.añadirReino(payload).subscribe(
      (data) => {
        Swal.fire('Reino agregado', 'El reino ha sido agregado con éxito', 'success').then(() => {
          this.router.navigate(['/listar-reino']);
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido agregar el reino', 'error');
        console.log(error);
      }
    );

}
}
