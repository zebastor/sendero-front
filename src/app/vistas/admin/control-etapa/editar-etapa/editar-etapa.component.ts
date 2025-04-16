import { Component, OnInit } from '@angular/core';
import { EtapaService } from '../../../../services/etapa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-editar-etapa',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './editar-etapa.component.html',
  styleUrl: './editar-etapa.component.css'
})
export class EditarEtapaComponent implements OnInit{
  public etapa: any = {};
  id: any = {};
  constructor(
    private etapaService: EtapaService,
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.etapaService.obteneEtapa(this.id).subscribe(
      (dato:any) => {
        this.etapa = dato;
        console.log(this.etapa);
      },
      (error) => {
        console.log(error);
      }
    )
}

public actualizarEtapa(){


  const payload = {
    id: this.etapa.id,
    nombre: this.etapa.nombre,

  };
 this.etapaService.guardarEtapa(payload).subscribe(
      (data) => {
        Swal.fire('Etapa actualizada', 'La etapa ha sido actualizada con éxito', 'success').then(() => {
          this.router.navigate(['/listar-etapa']);
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar la etapa', 'error');
        console.log(error);
      }
    );

}
}
