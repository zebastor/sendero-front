import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AccessibilityService, AccessibilitySettings } from '../../services/accessibility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessibility-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSliderModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './accessibility-panel.component.html',
  styleUrls: ['./accessibility-panel.component.css']
})
export class AccessibilityPanelComponent implements OnInit, OnDestroy {
  isOpen = false;
  settings: AccessibilitySettings;
  private subscription: Subscription;

  fontSizeOptions = [
    { value: 'small', label: 'Pequeño' },
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Grande' },
    { value: 'extra-large', label: 'Extra Grande' }
  ];

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

  togglePanel(): void {
    this.isOpen = !this.isOpen;
  }

  toggleDarkMode(): void {
    this.accessibilityService.toggleDarkMode();
  }

  onFontSizeChange(size: string): void {
    this.accessibilityService.setFontSize(size as AccessibilitySettings['fontSize']);
  }

  onZoomChange(zoom: number): void {
    this.accessibilityService.setZoom(zoom);
  }

  toggleGrayscale(): void {
    this.accessibilityService.toggleGrayscale();
  }

  toggleHighContrast(): void {
    this.accessibilityService.toggleHighContrast();
  }

  toggleUnderlineLinks(): void {
    this.accessibilityService.toggleUnderlineLinks();
  }

  toggleTextSpacing(): void {
    this.accessibilityService.toggleTextSpacing();
  }

  toggleReducedMotion(): void {
    this.accessibilityService.toggleReducedMotion();
  }

  toggleHighlightLinks(): void {
    this.accessibilityService.toggleHighlightLinks();
  }

  toggleBigCursor(): void {
    this.accessibilityService.toggleBigCursor();
  }

  resetSettings(): void {
    this.accessibilityService.resetSettings();
  }

  increaseZoom(): void {
    this.accessibilityService.setZoom(this.settings.zoom + 10);
  }

  decreaseZoom(): void {
    this.accessibilityService.setZoom(this.settings.zoom - 10);
  }
} 