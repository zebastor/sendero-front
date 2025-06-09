# 🌟 Guía de Accesibilidad - Sendero Ecológico

## 📋 Índice
- [Características Implementadas](#características-implementadas)
- [Cómo Activar las Opciones](#cómo-activar-las-opciones)
- [Navegación por Teclado](#navegación-por-teclado)
- [Lectores de Pantalla](#lectores-de-pantalla)
- [Configuraciones Disponibles](#configuraciones-disponibles)
- [Implementación Técnica](#implementación-técnica)

---

## ✨ Características Implementadas

### 🎨 **Personalización Visual**
- **Modo Oscuro**: Tema oscuro para reducir la fatiga visual
- **Tamaños de Fuente**: Pequeño, Normal, Grande, Extra Grande
- **Escala de Grises**: Convierte toda la interfaz a escala de grises
- **Alto Contraste**: Colores de alto contraste para mejor visibilidad
- **Zoom**: Control de zoom del 75% al 200%

### 🔗 **Mejoras de Navegación**
- **Enlaces Subrayados**: Subraya todos los enlaces para mejor identificación
- **Resaltado de Enlaces**: Destaca enlaces con colores llamativos
- **Cursor Grande**: Cursor más grande para mejor visibilidad
- **Espaciado de Texto**: Aumenta el espaciado entre líneas y caracteres
- **Movimiento Reducido**: Desactiva animaciones para usuarios sensibles

### ⌨️ **Accesibilidad por Teclado**
- Navegación completa por teclado
- Estados de focus visibles y mejorados
- Skip links para saltar al contenido principal
- Soporte para lectores de pantalla

---

## 🚀 Cómo Activar las Opciones

### **Acceso Rápido**
1. **Busca el botón flotante** con el ícono de accesibilidad (♿) en la esquina inferior derecha
2. **Haz clic** en el botón para abrir el menú
3. **Selecciona** las opciones que necesites

### **Navegación por Teclado**
1. Presiona `Tab` hasta llegar al botón de accesibilidad
2. Presiona `Enter` o `Espacio` para abrir el menú
3. Usa las flechas del teclado para navegar por las opciones
4. Presiona `Enter` para activar/desactivar opciones

---

## ⌨️ Navegación por Teclado

### **Atajos de Teclado Principales**
- `Tab`: Navegar hacia adelante
- `Shift + Tab`: Navegar hacia atrás
- `Enter`: Activar enlaces o botones
- `Espacio`: Activar botones o checkboxes
- `Escape`: Cerrar menús o modales

### **Skip Links**
Al cargar cualquier página, presiona `Tab` para acceder a los enlaces de salto:
- "Saltar al contenido principal"
- "Ir al panel de accesibilidad"

---

## 🔊 Lectores de Pantalla

### **Compatibilidad**
- **NVDA** (Windows)
- **JAWS** (Windows) 
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)
- **Orca** (Linux)

### **Características Específicas**
- Anuncios en vivo para cambios de estado
- Descripciones ARIA completas
- Etiquetas semánticas apropiadas
- Mensajes de error accesibles
- Indicadores de progreso verbales

---

## ⚙️ Configuraciones Disponibles

### **🌙 Modo Oscuro**
- **Qué hace**: Cambia a un tema oscuro
- **Beneficio**: Reduce la fatiga visual en ambientes con poca luz
- **Activación**: Botón "Modo Oscuro" en el panel

### **📝 Tamaño de Fuente**
- **Opciones**: Pequeño (14px), Normal (16px), Grande (18px), Extra Grande (22px)
- **Beneficio**: Mejora la legibilidad
- **Activación**: Menú "Tamaño de Letra"

### **🎨 Escala de Grises**
- **Qué hace**: Elimina todos los colores
- **Beneficio**: Ayuda a usuarios con daltonismo o sensibilidad al color
- **Activación**: Botón "Escala de Grises"

### **⚡ Alto Contraste**
- **Qué hace**: Aumenta el contraste entre texto y fondo
- **Beneficio**: Mejora la visibilidad para usuarios con baja visión
- **Activación**: Botón "Alto Contraste"

### **🔍 Zoom**
- **Opciones**: 75%, 100%, 125%, 150%, 200%
- **Beneficio**: Agranda toda la interfaz
- **Activación**: Menú "Zoom"

### **🔗 Enlaces Subrayados**
- **Qué hace**: Subraya todos los enlaces
- **Beneficio**: Hace los enlaces más visibles
- **Activación**: Botón "Subrayar Enlaces"

### **🖱️ Cursor Grande**
- **Qué hace**: Aumenta el tamaño del cursor
- **Beneficio**: Mejora la visibilidad del puntero
- **Activación**: Botón "Cursor Grande"

### **📏 Espaciado de Texto**
- **Qué hace**: Aumenta el espaciado entre líneas y caracteres
- **Beneficio**: Mejora la legibilidad
- **Activación**: Botón "Espaciado de Texto"

### **🎭 Movimiento Reducido**
- **Qué hace**: Desactiva animaciones y transiciones
- **Beneficio**: Ayuda a usuarios con vestibular disorders
- **Activación**: Botón "Reducir Movimiento"

---

## 🛠️ Implementación Técnica

### **Estructura de Archivos**
```
src/app/
├── services/
│   └── accessibility.service.ts          # Servicio principal
├── components/
│   └── accessibility-panel/
│       ├── accessibility-button.component.ts    # Botón flotante
│       └── accessibility-panel.component.ts     # Panel completo
├── directives/
│   └── accessibility.directive.ts        # Directiva personalizada
└── styles.css                           # Estilos globales
```

### **Uso del Servicio**
```typescript
// Inyectar el servicio
constructor(private accessibilityService: AccessibilityService) {}

// Activar modo oscuro
this.accessibilityService.toggleDarkMode();

// Cambiar tamaño de fuente
this.accessibilityService.setFontSize('large');

// Obtener configuraciones actuales
const settings = this.accessibilityService.getCurrentSettings();
```

### **Uso de la Directiva**
```html
<!-- Aplicar mejoras de accesibilidad a cualquier elemento -->
<button appAccessible ariaLabel="Guardar documento">
  Guardar
</button>

<!-- Con opciones adicionales -->
<div appAccessible 
     ariaLabel="Contenido principal" 
     [highContrastBorder]="true">
  Contenido...
</div>
```

### **CSS Variables Disponibles**
```css
:root {
  --color-primary: #1976d2;
  --color-background: #ffffff;
  --color-text: #212121;
  --color-focus: #ffeb3b;
  --font-size-base: 16px;
  --zoom-level: 100%;
}
```

---

## 🌐 Estándares de Accesibilidad

Esta implementación cumple con:
- **WCAG 2.1 Level AA** (Web Content Accessibility Guidelines)
- **Section 508** (US Federal Accessibility Standards)
- **EN 301 549** (European Accessibility Standard)

### **Criterios WCAG Cumplidos**
- ✅ 1.4.3 Contraste (Mínimo)
- ✅ 1.4.4 Redimensionar texto
- ✅ 1.4.10 Reflow
- ✅ 1.4.12 Espaciado de texto
- ✅ 2.1.1 Teclado
- ✅ 2.1.2 Sin trampa de teclado
- ✅ 2.4.1 Bloques de salto
- ✅ 2.4.3 Orden de enfoque
- ✅ 2.4.7 Enfoque visible
- ✅ 3.2.1 En el enfoque
- ✅ 4.1.2 Nombre, función, valor

---

## 🔧 Configuración Avanzada

### **Personalizar Configuraciones por Defecto**
```typescript
// En accessibility.service.ts
private defaultSettings: AccessibilitySettings = {
  darkMode: false,        // Cambiar a true para modo oscuro por defecto
  fontSize: 'normal',     // Cambiar a 'large' para texto grande por defecto
  // ... otras configuraciones
};
```

### **Agregar Nuevas Características**
1. Actualizar la interfaz `AccessibilitySettings`
2. Agregar el método en `AccessibilityService`
3. Actualizar el CSS en `styles.css`
4. Agregar el control en el componente del panel

---

## 🆘 Solución de Problemas

### **Las configuraciones no se guardan**
- Verificar que localStorage esté habilitado en el navegador
- Comprobar que no esté en modo incógnito

### **Los estilos no se aplican correctamente**
- Verificar que `styles.css` esté importado correctamente
- Comprobar la especificidad de CSS

### **Los lectores de pantalla no anuncian cambios**
- Verificar que los elementos tengan `aria-live` apropiados
- Comprobar que los anuncios se estén generando

---

## 📞 Contacto y Soporte

Para reportar problemas de accesibilidad o sugerir mejoras:
- **Email**: accesibilidad@sendero-ecologico.com
- **GitHub Issues**: [Enlace al repositorio]

---

**¡Gracias por hacer el Sendero Ecológico accesible para todos! 🌿♿** 