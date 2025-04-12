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

@Component({
  selector: 'app-agregar-especimen',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './agregar-especimen.component.html',
  styleUrl: './agregar-especimen.component.css'
})
export class AgregarEspecimenComponent implements OnInit {

  public especimen: any = { reino: {}, etapa:{}};
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
 
   onFileSelected(event: any): void {
     this.selectedFiles = Array.from(event.target.files);
   }
 
   onFileSelected3d(event: any): void {
     this.selectedFiles3d = Array.from(event.target.files);
   }
 
   imagenNombre: string = '';
   imagen3dNombre: string = '';
   
 
   
   
   
 
 
 
 
 
 
 
 
 
 
   public guardarDatos() {
     const imagen = {
       direccion: this.imagenNombre
     };
 
     const imagen3d = {
       direccion: this.imagen3dNombre
     };
   
     const payload = {
       nombre: this.especimen.nombre,
       descripcion: this.especimen.descripcion,
       reino: this.especimen.reino,
       etapas: this.especimen.etapas,
     imagenes: this.especimen.imagenes,
     imagenes3d: this.especimen.imagenes3d 
     };
   
     this.especimenService.añadirEspecimen(payload).subscribe(
       (data) => {
         Swal.fire('Especimen agregado', 'El especimen ha sido agregado con éxito', 'success').then(() => {
           this.router.navigate(['/listar']);
         });
       },
       (error) => {
         Swal.fire('Error en el sistema', 'No se ha podido agregar el especimen', 'error');
         console.log(error);
       }
     );
   }
 
 
   
 
 // Modifica el método subirYActualizar
 // Modificar el método subirYActualizar
 subirYGuardar(): void {
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
       this.guardarDatos();
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
 
 
 
 
 
 
 
 
 
 
 

}
