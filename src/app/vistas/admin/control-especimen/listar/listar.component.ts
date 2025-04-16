import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
interface FileInfo {
  name: string;
  size: number;
  modified: Date;
}
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import baserUrl from '../../../../services/helper';
import { EspecimenService } from '../../../../services/especimen.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, HeaderComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
   
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {

//prueba
  

//
  public imageWidth: number = 200; 
  public imageHeight: number = 200;

  files: FileInfo[] = [];
  
  especimenes : any = [  ];
  displayedColumns: string[] = ['preview', 'name', 'size', 'modified'];
  public baseUrl: string = baserUrl;
  constructor(private http: HttpClient, private especimenService: EspecimenService) { }

  ngOnInit(): void {
    this.http.get<FileInfo[]>(`${baserUrl}/files`)
      .subscribe({
        next: (data) => this.files = data || [],
        error: (err) => console.error('Error cargando archivos:', err)
      });



         this.especimenService.listarEspecimenes().subscribe(
            (dato:any) => {
              this.especimenes = dato;
              console.log(this.especimenes);
            },
            (error) => {
              console.log(error);
              Swal.fire('Error','Error al cargar los usuarios','error');
            }
          )




          
  }

  formatSize(size: number): string {
    return (size / 1024).toFixed(2) + ' KB';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'placeholder.png'; // Imagen por defecto
  }







  
    eliminarEspecimen(id:any){
      Swal.fire({
        title:'Eliminar Especimen',
        text:'¿Estás seguro de eliminar el especimen?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.especimenService.eliminarEspecimen(id).subscribe(
            (data) => {
              this.especimenes = this.especimenes.filter((especimen:any) => especimen.id != id);
              Swal.fire('Especimen eliminado','El Especimen ha sido eliminado de la base de datos','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el especimen','error');
            }
          )
        }
      })
    }
  
}
