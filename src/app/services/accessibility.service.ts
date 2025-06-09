import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AccessibilitySettings {
  darkMode: boolean;
  fontSize: 'small' | 'normal' | 'large' | 'extra-large';
  grayscale: boolean;
  highContrast: boolean;
  underlineLinks: boolean;
  zoom: number;
  textSpacing: boolean;
  reducedMotion: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private defaultSettings: AccessibilitySettings = {
    darkMode: false,
    fontSize: 'normal',
    grayscale: false,
    highContrast: false,
    underlineLinks: false,
    zoom: 100,
    textSpacing: false,
    reducedMotion: false,
    highlightLinks: false,
    bigCursor: false
  };

  private settingsSubject = new BehaviorSubject<AccessibilitySettings>(this.defaultSettings);
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadSettings();
    this.applySettings();
  }

  private loadSettings(): void {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.settingsSubject.next({ ...this.defaultSettings, ...settings });
    }
  }

  private saveSettings(settings: AccessibilitySettings): void {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }

  private applySettings(): void {
    this.settings$.subscribe(settings => {
      this.applyToDocument(settings);
    });
  }

  private applyToDocument(settings: AccessibilitySettings): void {
    const root = document.documentElement;
    
    // Remover clases anteriores
    root.classList.remove('dark-mode', 'grayscale', 'high-contrast', 'underline-links', 
                         'text-spacing', 'reduced-motion', 'highlight-links', 'big-cursor');
    root.classList.remove('font-small', 'font-normal', 'font-large', 'font-extra-large');

    // Aplicar nuevas configuraciones
    if (settings.darkMode) root.classList.add('dark-mode');
    if (settings.grayscale) root.classList.add('grayscale');
    if (settings.highContrast) root.classList.add('high-contrast');
    if (settings.underlineLinks) root.classList.add('underline-links');
    if (settings.textSpacing) root.classList.add('text-spacing');
    if (settings.reducedMotion) root.classList.add('reduced-motion');
    if (settings.highlightLinks) root.classList.add('highlight-links');
    if (settings.bigCursor) root.classList.add('big-cursor');

    // Aplicar tamaño de fuente
    root.classList.add(`font-${settings.fontSize}`);

    // Aplicar zoom
    root.style.setProperty('--zoom-level', `${settings.zoom}%`);
    document.body.style.zoom = `${settings.zoom}%`;
  }

  updateSetting<K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ): void {
    const currentSettings = this.settingsSubject.value;
    const newSettings = { ...currentSettings, [key]: value };
    this.settingsSubject.next(newSettings);
    this.saveSettings(newSettings);
  }

  resetSettings(): void {
    this.settingsSubject.next(this.defaultSettings);
    this.saveSettings(this.defaultSettings);
  }

  getCurrentSettings(): AccessibilitySettings {
    return this.settingsSubject.value;
  }

  toggleDarkMode(): void {
    const current = this.getCurrentSettings();
    this.updateSetting('darkMode', !current.darkMode);
  }

  setFontSize(size: AccessibilitySettings['fontSize']): void {
    this.updateSetting('fontSize', size);
  }

  setZoom(zoom: number): void {
    this.updateSetting('zoom', Math.max(50, Math.min(200, zoom)));
  }

  toggleGrayscale(): void {
    const current = this.getCurrentSettings();
    this.updateSetting('grayscale', !current.grayscale);
  }

  toggleHighContrast(): void {
    const current = this.getCurrentSettings();
    this.updateSetting('highContrast', !current.highContrast);
  }

  toggleUnderlineLinks(): void {
    const current = this.getCurrentSettings();
    this.updateSetting('underlineLinks', !current.underlineLinks);
  }

  toggleTextSpacing(): void {
    const current = this.getCurrentSettings();
    this.updateSetting('textSpacing', !current.textSpacing);
  }

  toggleReducedMotion(): void {
    const current = this.getCurrentSettings();
    this.updateSetting('reducedMotion', !current.reducedMotion);
  }

  toggleHighlightLinks(): void {
    const current = this.getCurrentSettings();
    this.updateSetting('highlightLinks', !current.highlightLinks);
  }

  toggleBigCursor(): void {
    const current = this.getCurrentSettings();
    this.updateSetting('bigCursor', !current.bigCursor);
  }


} 