import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccessibilityButtonComponent } from './components/accessibility-panel/accessibility-button.component';
import { AccessibilityService } from './services/accessibility.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, AccessibilityButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'sendero';

  constructor(private accessibilityService: AccessibilityService) {}

  ngOnInit(): void {
    // El servicio ya se inicializa automáticamente, pero podemos asegurar 
    // que esté disponible globalmente
    console.log('🎯 Sistema de accesibilidad iniciado globalmente');
  }
}
