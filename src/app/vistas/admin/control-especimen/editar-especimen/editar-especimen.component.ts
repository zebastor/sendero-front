import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import baserUrl from '../../../../services/helper';
import { EspecimenService } from '../../../../services/especimen.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ReinoService } from '../../../../services/reino.service';
import { EtapaService } from '../../../../services/etapa.service';
import { filter, map } from 'rxjs';
import { ImagenService } from '../../../../services/imagen.service';
import { Imagen3dService } from '../../../../services/imagen3d.service';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-editar-especimen',
  imports: [CommonModule, HttpClientModule, FormsModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './editar-especimen.component.html',
  styleUrl: './editar-especimen.component.css'
})


export class EditarEspecimenComponent implements OnInit {

 public especimen: any = { reino: {}, etapa:[]};
 id: any = {};

 public reinos: any[] = [];

 public etapas: any[] = [];

 selectedFiles: File[] = [];
 selectedFiles3d: File[] = [];
 uploadProgress: { [key: string]: number } = {};

  compareReinos(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  compareEtapas(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  
 
  imagenes3d : any = [

  ]
  
  public imageWidth: number = 200;  // Ejemplo: 200 píxeles de ancho
  public imageHeight: number = 200;

  public baseUrl: string = baserUrl;
  

  constructor(
    private http: HttpClient,
    private especimenService: EspecimenService,
    private route: ActivatedRoute, 
    private router: Router, 
    private reinoService: ReinoService,
    private etapasService: EtapaService,
    private imagenService: ImagenService,
    private imagen3dService: Imagen3dService
  ) {}



  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
    this.especimenService.obtenerEspecimen(this.id).subscribe(
      (data) => {
        this.especimen = data;
     
        console.log(this.especimen);
      },
      (error) => {
        console.log(error);
      }
    )


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

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onFileSelected3d(event: any): void {
    this.selectedFiles3d = Array.from(event.target.files);
  }

  imagenNombre: string = '';
  imagen3dNombre: string = '';
  

  
  
  










  public actualizarDatos() {
    const imagen = {
      direccion: this.imagenNombre
    };

    const imagen3d = {
      direccion: this.imagen3dNombre
    };
  
    const payload = {
      id: this.especimen.id,
      nombre: this.especimen.nombre,
      descripcion: this.especimen.descripcion,
      reino: this.especimen.reino,
      etapas: this.especimen.etapas,
    imagenes: this.especimen.imagenes,
    imagenes3d: this.especimen.imagenes3d 
    };
  
    this.especimenService.guardarEspecimen(payload).subscribe(
      (data) => {
        Swal.fire('Especimen actualizado', 'El especimen ha sido actualizado con éxito', 'success').then(() => {
          this.router.navigate(['/listar']);
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar el especimen', 'error');
        console.log(error);
      }
    );
  }


  

// Modifica el método subirYActualizar
// Modificar el método subirYActualizar
subirYActualizar(): void {
  if (!this.selectedFiles.length && !this.selectedFiles3d.length) {
    Swal.fire('Error', 'Seleccione al menos un archivo (imagen o 3D)', 'error');
    return;
  }

  const uploadPromises: { type: '2d' | '3d', promise: Promise<any> }[] = [];

  if (this.selectedFiles.length > 0) {
    const formData = new FormData();
    this.selectedFiles.forEach(file => formData.append('file', file));
    
    uploadPromises.push({
      type: '2d',
      promise: this.http.post(`${baserUrl}/upload`, formData, { observe: 'response' }).toPromise()
    });
  }

  if (this.selectedFiles3d.length > 0) {
    const formData3d = new FormData();
    this.selectedFiles3d.forEach(file => formData3d.append('file', file));
    
    uploadPromises.push({
      type: '3d',
      promise: this.http.post(`${baserUrl}/upload3d`, formData3d, { observe: 'response' }).toPromise()
    });
  }

  Promise.all(uploadPromises.map(up => up.promise)).then((results: any[]) => {
    let errorMessages: string[] = [];
    
    results.forEach((res, index) => {
      const currentType = uploadPromises[index].type;
      
      if (res.status === 409) {
        const typeName = currentType === '2d' ? 'imágenes' : 'modelos 3D';
        errorMessages.push(`${typeName}: ${res.error.duplicates.join(', ')}`);
      }
      else if (!res.body?.success) {
        errorMessages.push(res.body?.message || `Error en subida de ${currentType === '2d' ? 'imágenes' : '3D'}`);
      }
      else {
        const newFiles = res.body.files.map((filename: string) => ({ direccion: filename }));
        currentType === '2d' 
          ? this.especimen.imagenes.push(...newFiles)
          : this.especimen.imagenes3d.push(...newFiles);
      }
    });

    if (errorMessages.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Problemas en subida',
        html: `Errores:<br>${errorMessages.join('<br>')}`
      });
    } else {
      this.actualizarDatos();
      Swal.fire('Éxito', 'Todos los archivos subidos correctamente', 'success');
    }
  }).catch(error => {
    Swal.fire('Error', 'Error en el proceso de subida', 'error');
  });
}
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'placeholder.png'; // Imagen por defecto
  }

  handleImageError3d(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'placeholder.glb'; // Imagen por defecto
  }




  
  eliminarImagen(id: any, direccion: string) {
    Swal.fire({
      title: 'Eliminar Imagen',
      text: '¿Estás seguro de eliminar la imagen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // 1. Eliminar de la base de datos
        this.imagenService.eliminarImagen(id).subscribe({
          next: () => {
            // 2. Eliminar el archivo del servidor
            this.http.delete(`${baserUrl}/files/${direccion}`).subscribe({
              next: () => {
                // Actualizar la lista de imágenes
                this.especimen.imagenes = this.especimen.imagenes.filter(
                  (imagen: any) => imagen.id !== id
                );
                Swal.fire('Éxito', 'Imagen eliminada completamente', 'success');
              },
              error: (fileError) => {
                Swal.fire('Advertencia', 'Imagen eliminada de la BD pero no del servidor', 'warning');
              }
            });
          },
          error: (dbError) => {
            Swal.fire('Error', 'No se pudo eliminar de la base de datos', 'error');
          }
        });
      }
    });
  }





  eliminarImagen3d(id: any, direccion: string) {
    Swal.fire({
      title: 'Eliminar Modelo 3D',
      text: '¿Estás seguro de eliminar este modelo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.imagen3dService.eliminarImagen3d(id).subscribe({
          next: () => {
            this.http.delete(`${baserUrl}/files3d/${direccion}`).subscribe({
              next: () => {
                this.especimen.imagenes3d = this.especimen.imagenes3d.filter(
                  (img: any) => img.id !== id
                );
                Swal.fire('Éxito', 'Modelo 3D eliminado completamente', 'success');
              },
              error: (fileError) => {
                Swal.fire('Advertencia', 'Modelo eliminado de la BD pero no del servidor', 'warning');
              }
            });
          },
          error: (dbError) => {
            Swal.fire('Error', 'No se pudo eliminar de la base de datos', 'error');
          }
        });
      }
    });
  }













}
