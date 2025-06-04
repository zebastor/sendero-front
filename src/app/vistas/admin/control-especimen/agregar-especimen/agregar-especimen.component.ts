import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EspecimenService } from '../../../../services/especimen.service';
import { EtapaService } from '../../../../services/etapa.service';
import baserUrl from '../../../../services/helper';
import { ImagenService } from '../../../../services/imagen.service';
import { Imagen3dService } from '../../../../services/imagen3d.service';
import { ReinoService } from '../../../../services/reino.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-agregar-especimen',
  imports: [CommonModule, HttpClientModule, FormsModule, HeaderComponent],
  templateUrl: './agregar-especimen.component.html',
  styleUrls: ['./agregar-especimen.component.css']
})
export class AgregarEspecimenComponent implements OnInit {
  public especimen: any = {
    nombre: '',
    descripcion: '',
    reino: {},
    etapas: [],
    imagenes: [],      // Imágenes 2D
    imagenes3d: []     // Imágenes 3D
  };

  id: any = {};
  public reinos: any[] = [];
  public etapas: any[] = [];

  selectedFiles: File[] = [];
  selectedFiles3d: File[] = [];

  public baseUrl: string = baserUrl;

  constructor(
    private http: HttpClient,
    private especimenService: EspecimenService,
    private route: ActivatedRoute,
    private router: Router,
    private reinoService: ReinoService,
    private etapasService: EtapaService,
  ) {}

 
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];



  this.reinoService.listarReinos().subscribe(
    (data: any) => {
      this.reinos = data;
   
      console.log(this.reinos);
    },
    (error) => {
      console.log(error);
    }
  )

  this.etapasService.listarEtapas().subscribe(
    (data: any) => {
      this.etapas = data;
   
      console.log(this.etapas);
    },
    (error) => {
      console.log(error);
    }
  )
}

  compareReinos(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }
  compareEtapas(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }
  onFileSelected3d(event: any): void {
    this.selectedFiles3d = Array.from(event.target.files);
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'placeholder.png';
  }
  handleImageError3d(event: Event): void {
    (event.target as HTMLImageElement).src = 'placeholder.glb';
  }

  public guardarDatos(): void {
    const payload = {
      nombre: this.especimen.nombre,
      descripcion: this.especimen.descripcion,
      reino: this.especimen.reino,
      etapas: this.especimen.etapas,
      imagenes: this.especimen.imagenes,
      imagenes3d: this.especimen.imagenes3d
    };

    this.especimenService.añadirEspecimen(payload).subscribe(
      () => {
        Swal.fire('Especimen agregado', 'El espécimen ha sido agregado con éxito', 'success')
          .then(() => this.router.navigate(['/listar']));
      },
      error => {
        Swal.fire('Error en el sistema', 'No se ha podido agregar el espécimen', 'error');
        console.error(error);
      }
    );
  }

  public subirYGuardar(): void {
    if (!this.selectedFiles.length && !this.selectedFiles3d.length) {
      Swal.fire('Error', 'Seleccione al menos un archivo (imagen o 3D)', 'error');
      return;
    }

    // 1) Abrimos el SweetAlert de carga y arrancamos la subida en didOpen
    Swal.fire({
      title: 'Cargando archivos, espere por favor',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(null);
        this.ejecutarSubidas();
      }
    });
  }

  private ejecutarSubidas(): void {
    const promesas: Promise<any>[] = [];

    if (this.selectedFiles.length) {
      const fd2d = new FormData();
      this.selectedFiles.forEach(f => fd2d.append('file', f));
      promesas.push(
        this.http.post(`${this.baseUrl}/upload`, fd2d, { observe: 'response' }).toPromise()
      );
    }

    if (this.selectedFiles3d.length) {
      const fd3d = new FormData();
      this.selectedFiles3d.forEach(f => fd3d.append('file', f));
      promesas.push(
        this.http.post(`${this.baseUrl}/upload3d`, fd3d, { observe: 'response' }).toPromise()
      );
    }

    Promise.all(promesas)
      .then(results => {
        const errs: string[] = [];
        results.forEach((res, i) => {
          const tipo = (i === 0 && this.selectedFiles.length) ? '2D' : '3D';
          if (res.status === 409) {
            errs.push(`${tipo}: ${res.error.duplicates.join(', ')}`);
          } else if (!res.body?.success) {
            errs.push(res.body?.message || `Error subiendo archivos ${tipo}`);
          } else {
            const nuevos = res.body.files.map((fn: string) => ({ direccion: fn }));
            if (tipo === '2D') this.especimen.imagenes.push(...nuevos);
            else            this.especimen.imagenes3d.push(...nuevos);
          }
        });

        Swal.close();  // cerramos el loading
        if (errs.length) {
          Swal.fire('Problemas en subida', errs.join('\n'), 'error');
        } else {
          Swal.fire('¡Listo!', 'Archivos subidos correctamente.', 'success');
          this.guardarDatos();
        }
      })
      .catch(() => {
        Swal.close();
        Swal.fire('Error', 'Hubo un problema subiendo los archivos.', 'error');
      });
  }
}
