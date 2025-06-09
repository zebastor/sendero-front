import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { AccessibilityService, AccessibilitySettings } from '../../services/accessibility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessibility-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDividerModule
  ],
  template: `
    <button 
      mat-fab 
      color="primary"
      class="accessibility-fab"
      [matMenuTriggerFor]="accessibilityMenu"
      aria-label="Opciones de accesibilidad">
      ♿
    </button>

    <mat-menu #accessibilityMenu="matMenu">
      <!-- Modo oscuro -->
      <button mat-menu-item (click)="toggleDarkMode()">
        <span class="emoji-icon">{{ settings.darkMode ? '☀️' : '🌙' }}</span>
        <span>{{ settings.darkMode ? 'Modo Claro' : 'Modo Oscuro' }}</span>
      </button>

      <!-- Tamaño de fuente -->
      <button mat-menu-item [matMenuTriggerFor]="fontMenu">
        <span class="emoji-icon">📝</span>
        <span>Tamaño de Letra</span>
      </button>

      <!-- Escala de grises -->
      <button mat-menu-item (click)="toggleGrayscale()">
        <span class="emoji-icon">{{ settings.grayscale ? '🎨' : '⚫' }}</span>
        <span>{{ settings.grayscale ? 'Color Normal' : 'Escala de Grises' }}</span>
      </button>

      <!-- Alto contraste -->
      <button mat-menu-item (click)="toggleHighContrast()">
        <span class="emoji-icon">{{ settings.highContrast ? '👁️' : '⚡' }}</span>
        <span>{{ settings.highContrast ? 'Contraste Normal' : 'Alto Contraste' }}</span>
      </button>

      <!-- Zoom -->
      <button mat-menu-item [matMenuTriggerFor]="zoomMenu">
        <span class="emoji-icon">🔍</span>
        <span>Zoom ({{ settings.zoom }}%)</span>
      </button>

      <!-- Subrayar enlaces -->
      <button mat-menu-item (click)="toggleUnderlineLinks()">
        <span class="emoji-icon">{{ settings.underlineLinks ? '🔗' : '📎' }}</span>
        <span>{{ settings.underlineLinks ? 'Enlaces Normales' : 'Subrayar Enlaces' }}</span>
      </button>

      <!-- Cursor grande -->
      <button mat-menu-item (click)="toggleBigCursor()">
        <span class="emoji-icon">{{ settings.bigCursor ? '🖱️' : '👆' }}</span>
        <span>{{ settings.bigCursor ? 'Cursor Normal' : 'Cursor Grande' }}</span>
      </button>

      <!-- Reset -->
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="resetSettings()">
        <span class="emoji-icon">🔄</span>
        <span>Restablecer Todo</span>
      </button>
    </mat-menu>

    <!-- Submenu tamaño de fuente -->
    <mat-menu #fontMenu="matMenu">
      <button mat-menu-item (click)="setFontSize('small')" 
              [class.active]="settings.fontSize === 'small'">
        <span class="emoji-icon">{{ settings.fontSize === 'small' ? '✅' : '📄' }}</span>
        <span>Pequeño</span>
      </button>
      <button mat-menu-item (click)="setFontSize('normal')" 
              [class.active]="settings.fontSize === 'normal'">
        <span class="emoji-icon">{{ settings.fontSize === 'normal' ? '✅' : '📝' }}</span>
        <span>Normal</span>
      </button>
      <button mat-menu-item (click)="setFontSize('large')" 
              [class.active]="settings.fontSize === 'large'">
        <span class="emoji-icon">{{ settings.fontSize === 'large' ? '✅' : '📰' }}</span>
        <span>Grande</span>
      </button>
      <button mat-menu-item (click)="setFontSize('extra-large')" 
              [class.active]="settings.fontSize === 'extra-large'">
        <span class="emoji-icon">{{ settings.fontSize === 'extra-large' ? '✅' : '📊' }}</span>
        <span>Extra Grande</span>
      </button>
    </mat-menu>

    <!-- Submenu zoom -->
    <mat-menu #zoomMenu="matMenu">
      <button mat-menu-item (click)="setZoom(75)">
        <span class="emoji-icon">{{ settings.zoom === 75 ? '✅' : '🔎' }}</span>
        <span>75%</span>
      </button>
      <button mat-menu-item (click)="setZoom(100)">
        <span class="emoji-icon">{{ settings.zoom === 100 ? '✅' : '👁️' }}</span>
        <span>100%</span>
      </button>
      <button mat-menu-item (click)="setZoom(125)">
        <span class="emoji-icon">{{ settings.zoom === 125 ? '✅' : '🔍' }}</span>
        <span>125%</span>
      </button>
      <button mat-menu-item (click)="setZoom(150)">
        <span class="emoji-icon">{{ settings.zoom === 150 ? '✅' : '📏' }}</span>
        <span>150%</span>
      </button>
      <button mat-menu-item (click)="setZoom(200)">
        <span class="emoji-icon">{{ settings.zoom === 200 ? '✅' : '🔬' }}</span>
        <span>200%</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .accessibility-fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      font-size: 24px;
      font-weight: bold;
      background-color: #1976d2 !important;
      color: white !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .accessibility-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
      background-color: #1565c0 !important;
    }

    /* Estilos para emojis en el menú */
    .emoji-icon {
      display: inline-block;
      margin-right: 8px;
      font-size: 18px;
      min-width: 24px;
      text-align: center;
    }

    /* Permitir que el menú se adapte a los cambios de accesibilidad */
    ::ng-deep .mat-menu-panel {
      border-radius: 8px;
      border: 2px solid #1976d2;
      min-width: 250px;
    }

    ::ng-deep .mat-menu-item {
      padding: 12px 16px;
      align-items: center;
      display: flex;
    }

    ::ng-deep .mat-menu-item.active {
      font-weight: bold;
    }

    ::ng-deep .mat-divider {
      margin: 8px 0;
    }

          @media (max-width: 768px) {
        .accessibility-fab {
          bottom: 15px;
          right: 15px;
          transform: scale(0.9);
          font-size: 20px;
        }
        
        .accessibility-fab:hover {
          transform: scale(1.0);
        }

        ::ng-deep .mat-menu-panel {
          min-width: 200px;
        }
      }
  `]
})
export class AccessibilityButtonComponent implements OnInit, OnDestroy {
  settings: AccessibilitySettings;
  private subscription!: Subscription;

  constructor(private accessibilityService: AccessibilityService) {
    this.settings = this.accessibilityService.getCurrentSettings();
  }

  ngOnInit(): void {
    this.subscription = this.accessibilityService.settings$.subscribe(
      settings => this.settings = settings
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleDarkMode(): void {
    this.accessibilityService.toggleDarkMode();
  }

  setFontSize(size: AccessibilitySettings['fontSize']): void {
    this.accessibilityService.setFontSize(size);
  }

  toggleGrayscale(): void {
    this.accessibilityService.toggleGrayscale();
  }

  toggleHighContrast(): void {
    this.accessibilityService.toggleHighContrast();
  }

  setZoom(zoom: number): void {
    this.accessibilityService.setZoom(zoom);
  }

  toggleUnderlineLinks(): void {
    this.accessibilityService.toggleUnderlineLinks();
  }

  toggleBigCursor(): void {
    this.accessibilityService.toggleBigCursor();
  }



  resetSettings(): void {
    this.accessibilityService.resetSettings();
  }
} 