import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionService } from '../../../services/estacion.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../../../services/helper';

interface FileInfo {
  name: string;
  size: number;
  modified: Date;
}

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  imports: [CommonModule, FormsModule, HeaderComponent],
  styleUrls: ['./estacion.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EstacionComponent implements OnInit, OnDestroy {

  plataformaApple: boolean = false;

  files: FileInfo[] = [];
  public imageWidth: number = 200; 
  public imageHeight: number = 200;
  public estacion: any = null;
  private paramSubscription!: Subscription;

  constructor(
    private estacionService: EstacionService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  public baseUrl: string = baserUrl;
  ngOnInit(): void {

    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    this.plataformaApple =
      platform.includes('mac') ||
      platform.includes('iphone') ||
      platform.includes('ipad') ||
      userAgent.includes('iphone') ||
      userAgent.includes('ipad') ||
      userAgent.includes('macintosh');
      
    this.http.get<FileInfo[]>(`${baserUrl}/files`)
    .subscribe({
      next: (data) => this.files = data || [],
      error: (err) => console.error('Error cargando archivos:', err)
    });

    this.paramSubscription = this.route.params.subscribe(params => {
      const numero = params['numero'];
      this.cargarEstacion(numero);
    });
  }

  cargarEstacion(numero: number | string): void {
    this.estacionService.obtenerEstacionPorNumero(numero).subscribe(
      (dato: any) => {
        this.estacion = dato;
        console.log('Estacion seleccionada: ', this.estacion);
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Error al cargar la estación', 'error');
        this.router.navigate(['/dashboard']);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }


  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'placeholder.png'; // Imagen por defecto
  }
}
