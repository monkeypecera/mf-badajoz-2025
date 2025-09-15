# 👥 Guía de Usuario - Monkey Food Competition

## 🎯 Índice
1. [Introducción](#introducción)
2. [Para Participantes](#para-participantes)
3. [Para Administradores](#para-administradores)
4. [Funcionalidades Avanzadas](#funcionalidades-avanzadas)
5. [Preguntas Frecuentes](#preguntas-frecuentes)
6. [Soporte](#soporte)

---

## 🐒 Introducción

Bienvenido al sistema de concursos de **Monkey Food**. Esta aplicación te permite participar en concursos emocionantes y ganar premios increíbles de forma fácil y segura.

### ¿Qué puedes hacer?
- 🎲 **Participar** en concursos con un simple formulario
- 🏆 **Ganar premios** instantáneos con diferentes probabilidades
- 📧 **Recibir notificaciones** por email si ganas
- 🔒 **Participación segura** con sistema anti-fraude
- 📱 **Acceso desde cualquier dispositivo** (móvil, tablet, PC)

---

## 🎮 Para Participantes

### 1. Cómo Participar

#### Paso 1: Acceder al Concurso
- Visita la página web del concurso
- O accede desde el iframe embebido en la web de Monkey Food

#### Paso 2: Completar el Formulario
```
📝 Datos requeridos:
• Nombre completo
• Email válido
• Número de teléfono
• Aceptar términos y condiciones
```

#### Paso 3: Enviar Participación
- Haz clic en "¡Participar Ahora!"
- El sistema verificará tus datos automáticamente
- Recibirás el resultado instantáneamente

### 2. Resultados Posibles

#### 🏆 ¡Has Ganado!
```
✅ Mensaje: "¡Felicidades! Has ganado [PREMIO]"
✅ Recibirás un email con:
   • Código de premio único
   • Instrucciones para canjear
   • Información de contacto
```

#### 😔 No has ganado esta vez
```
❌ Mensaje: "No has ganado esta vez, ¡pero gracias por participar!"
❌ Puedes intentarlo desde otro dispositivo
❌ O esperar a futuros concursos
```

### 3. Sistema Anti-Fraude

#### ¿Por qué no puedo participar otra vez?
El sistema identifica tu dispositivo para evitar participaciones múltiples:
- 🔒 **Una participación por dispositivo**
- 🔒 **Identificación única y segura**
- 🔒 **Sin cookies ni datos personales almacenados**

#### ¿Cómo participar desde otro dispositivo?
- Usa tu móvil si participaste desde PC
- Usa una tablet diferente
- Pide a un amigo que participe desde su dispositivo

### 4. Premios Disponibles

#### Tipos de Premios
```
🍔 Hamburguesa Gratis
   • Probabilidad: 30%
   • Válido en cualquier local
   • Vigencia: 30 días

🍟 Patatas Gratis
   • Probabilidad: 40%
   • Acompañamiento gratuito
   • Vigencia: 30 días

🥤 Bebida Gratis
   • Probabilidad: 25%
   • Cualquier bebida del menú
   • Vigencia: 30 días

🎁 Premio Sorpresa
   • Probabilidad: 5%
   • Premio especial
   • Condiciones especiales
```

### 5. Cómo Canjear tu Premio

#### Si has ganado:
1. **Revisa tu email** (incluyendo spam)
2. **Busca el código de premio** (formato: MF-ABC-123456-789)
3. **Visita cualquier local** de Monkey Food
4. **Muestra el código** al personal
5. **¡Disfruta tu premio!**

#### Problemas con el email:
- Revisa la carpeta de spam
- Verifica que el email esté escrito correctamente
- Contacta con soporte si no recibes el email en 10 minutos

---

## 👨‍💼 Para Administradores

### 1. Acceso al Panel de Administración

#### URL de Acceso
```
https://tu-dominio.com/admin.html
```

#### Credenciales
- **Usuario**: Configurado en variables de entorno
- **Contraseña**: Configurada en variables de entorno

### 2. Dashboard Principal

#### Estadísticas en Tiempo Real
```
📊 Métricas Principales:
• Total de participantes
• Premios otorgados por tipo
• Tasa de conversión
• Participaciones por hora/día
```

#### Gráficos Visuales
- 📈 **Gráfico de barras**: Premios por tipo
- 📊 **Estadísticas numéricas**: Totales y porcentajes
- 🔄 **Actualización automática**: Cada 30 segundos

### 3. Gestión de Participantes

#### Tabla de Participantes
```
📋 Información mostrada:
• Nombre completo
• Email de contacto
• Teléfono
• Premio ganado (si aplica)
• Fecha y hora de participación
```

#### Funciones Disponibles
- 📥 **Exportar a CSV**: Descargar todos los datos
- 🔍 **Búsqueda y filtrado**: Encontrar participantes específicos
- 📊 **Ordenación**: Por fecha, nombre, premio, etc.

### 4. Gestión de Premios

#### Configuración de Premios
```
🎯 Para cada premio puedes configurar:
• Nombre del premio
• Cantidad disponible
• Probabilidad de ganar
• Estado (activo/inactivo)
```

#### Reiniciar Premios
- 🔄 **Reinicio completo**: Volver a cantidades originales
- ⚠️ **Confirmación requerida**: Acción irreversible
- 📊 **Actualización inmediata**: Estadísticas se actualizan

### 5. Sistema de Email

#### Test de Email
```
📧 Función de prueba:
• Envía email de prueba a dirección específica
• Verifica configuración SMTP
• Confirma que los emails llegan correctamente
```

#### Monitoreo de Emails
- ✅ **Emails enviados**: Contador automático
- ❌ **Errores de envío**: Log de errores
- 🔧 **Diagnóstico**: Herramientas de verificación

### 6. Seguridad del Panel

#### Medidas de Protección
- 🔐 **Autenticación básica**: Usuario y contraseña
- 🛡️ **Sesiones seguras**: Timeout automático
- 🔒 **HTTPS obligatorio**: En producción
- 📝 **Logs de acceso**: Registro de actividad

---

## 🚀 Funcionalidades Avanzadas

### 1. Embedding en WordPress

#### Para Webmasters
```html
<!-- Código iframe optimizado -->
<div class="monkey-food-contest">
  <iframe 
    src="https://tu-dominio.com" 
    width="100%" 
    height="600" 
    frameborder="0" 
    allowfullscreen
    loading="lazy"
    title="Concurso Monkey Food">
  </iframe>
</div>

<style>
.monkey-food-contest {
  max-width: 800px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}
</style>
```

### 2. Personalización Visual

#### Colores y Branding
- 🎨 **Colores principales**: Configurables en CSS
- 🖼️ **Logo personalizable**: Reemplazar en `/images/`
- 📱 **Responsive design**: Adaptable a todos los dispositivos

### 3. Analytics y Métricas

#### Datos Disponibles
```
📈 Métricas de rendimiento:
• Participaciones por día/hora
• Tasa de conversión por premio
• Dispositivos más utilizados
• Horarios de mayor actividad
```

---

## ❓ Preguntas Frecuentes

### Para Participantes

**P: ¿Puedo participar varias veces?**
R: No, el sistema permite una participación por dispositivo para mantener la equidad.

**P: ¿Por qué no recibo el email del premio?**
R: Revisa tu carpeta de spam. Si no aparece, contacta con soporte.

**P: ¿Cuánto tiempo tengo para canjear mi premio?**
R: Los premios tienen una vigencia de 30 días desde la fecha de emisión.

**P: ¿Puedo transferir mi premio a otra persona?**
R: Los premios son personales e intransferibles.

### Para Administradores

**P: ¿Cómo cambio las probabilidades de los premios?**
R: Actualmente se configuran en el código. Contacta con el desarrollador para cambios.

**P: ¿Puedo ver quién ha canjeado su premio?**
R: El sistema actual no rastrea el canje. Se puede implementar como mejora futura.

**P: ¿Cómo hago backup de los datos?**
R: Los datos están en MongoDB Atlas con backup automático. También puedes exportar CSV.

**P: ¿Puedo personalizar los emails?**
R: Sí, editando las plantillas en `server/utils/emailService.js`.

### Técnicas

**P: ¿Es seguro el sistema?**
R: Sí, incluye validación de datos, protección CSRF, rate limiting y headers de seguridad.

**P: ¿Funciona en móviles?**
R: Sí, el diseño es completamente responsive y optimizado para móviles.

**P: ¿Puedo usar mi propio dominio?**
R: Sí, configura tu dominio en Render o tu proveedor de hosting.

---

## 📞 Soporte

### Canales de Soporte

#### Para Participantes
- 📧 **Email**: soporte@monkeyfood.es
- 📱 **WhatsApp**: +34 XXX XXX XXX
- 🕒 **Horario**: Lunes a Viernes, 9:00 - 18:00

#### Para Administradores
- 🔧 **Soporte técnico**: tech@monkeyfood.es
- 📖 **Documentación**: Ver `INSTALLATION_GUIDE.md`
- 🐛 **Reportar bugs**: GitHub Issues

### Información de Contacto

#### Monkey Food
```
🏢 Dirección: [Tu dirección]
📞 Teléfono: [Tu teléfono]
📧 Email: info@monkeyfood.es
🌐 Web: https://monkeyfood.es
```

### Recursos Adicionales

- 📋 **Términos y Condiciones**: [Enlace]
- 🔒 **Política de Privacidad**: [Enlace]
- 📖 **Blog**: Noticias y actualizaciones
- 📱 **Redes Sociales**: Síguenos para concursos especiales

---

## 🎉 ¡Disfruta del Concurso!

**Gracias por usar el sistema de concursos de Monkey Food. ¡Esperamos que tengas mucha suerte y ganes premios increíbles!**

*¿Tienes sugerencias para mejorar? ¡Nos encantaría escucharte!*

---

**Desarrollado con ❤️ para la comunidad Monkey Food**