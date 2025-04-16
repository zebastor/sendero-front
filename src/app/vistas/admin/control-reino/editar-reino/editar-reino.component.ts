import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReinoService } from '../../../../services/reino.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-editar-reino',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './editar-reino.component.html',
  styleUrl: './editar-reino.component.css'
})
export class EditarReinoComponent implements OnInit{
  public reino: any = {};
  id: any = {};
  constructor(
    private reinoService: ReinoService,
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.reinoService.obtenerReino(this.id).subscribe(
      (dato:any) => {
        this.reino = dato;
        console.log(this.reino);
      },
      (error) => {
        console.log(error);
      }
    )
}

public actualizarReino(){


  const payload = {
    id: this.reino.id,
    nombre: this.reino.nombre,

  };
 this.reinoService.guardarReino(payload).subscribe(
      (data) => {
        Swal.fire('Reino actualizado', 'El reino ha sido actualizado con éxito', 'success').then(() => {
          this.router.navigate(['/listar-reino']);
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar el reino', 'error');
        console.log(error);
      }
    );

}
}
