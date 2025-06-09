import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAccessible]',
  standalone: true
})
export class AccessibilityDirective implements OnInit {
  @Input() ariaLabel: string = '';
  @Input() skipOnFocus: boolean = false;
  @Input() highContrastBorder: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setupAccessibility();
  }

  private setupAccessibility(): void {
    const element = this.el.nativeElement;

    // Agregar aria-label si se proporciona
    if (this.ariaLabel) {
      this.renderer.setAttribute(element, 'aria-label', this.ariaLabel);
    }

    // Asegurar que el elemento sea focusable si es interactivo
    if (this.isInteractiveElement(element)) {
      if (!element.hasAttribute('tabindex')) {
        this.renderer.setAttribute(element, 'tabindex', '0');
      }
    }

    // Agregar borde de alto contraste si se especifica
    if (this.highContrastBorder) {
      this.renderer.addClass(element, 'high-contrast-element');
    }

    // Mejorar estados de focus
    this.renderer.addClass(element, 'accessible-element');
  }

  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
    const hasClickHandler = element.onclick !== null;
    const hasRole = element.getAttribute('role') === 'button' || 
                   element.getAttribute('role') === 'link';
    
    return interactiveTags.includes(element.tagName) || hasClickHandler || hasRole;
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    if (this.skipOnFocus) {
      return;
    }

    // Agregar clase para estado de focus mejorado
    this.renderer.addClass(this.el.nativeElement, 'accessibility-focused');
    
    // Anunciar el elemento para lectores de pantalla
    this.announceElement();
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    this.renderer.removeClass(this.el.nativeElement, 'accessibility-focused');
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Mejorar navegación por teclado
    if (event.key === 'Enter' || event.key === ' ') {
      const element = this.el.nativeElement;
      
      // Si es un elemento clickeable pero no es un botón nativo
      if (this.isInteractiveElement(element) && element.tagName !== 'BUTTON') {
        event.preventDefault();
        element.click();
      }
    }
  }

  private announceElement(): void {
    const element = this.el.nativeElement;
    const text = this.ariaLabel || element.textContent || element.getAttribute('title') || '';
    
    if (text) {
      // Crear anuncio para lectores de pantalla
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Enfocado: ${text}`;
      
      document.body.appendChild(announcement);
      
      // Remover después de un momento
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }
} 