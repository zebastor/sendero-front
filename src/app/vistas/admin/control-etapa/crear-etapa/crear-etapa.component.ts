import { Component } from '@angular/core';
import { EtapaService } from '../../../../services/etapa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-crear-etapa',
  imports: [CommonModule,FormsModule,HeaderComponent],
  templateUrl: './crear-etapa.component.html',
  styleUrl: './crear-etapa.component.css'
})
export class CrearEtapaComponent {

  public etapa: any = {nombre:''};
  id: any = {};
  constructor(
    private etapaService: EtapaService,
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient
  ) {}


public crearEtapa(){


  const payload = {
    id: this.etapa.id,
    nombre: this.etapa.nombre,

  };
 this.etapaService.añadirEtapa(payload).subscribe(
      (data) => {
        Swal.fire('Etapa agregada', 'La etapa ha sido agregada con éxito', 'success').then(() => {
          this.router.navigate(['/listar-etapa']);
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido agregar la etapa', 'error');
        console.log(error);
      }
    );

}

}
