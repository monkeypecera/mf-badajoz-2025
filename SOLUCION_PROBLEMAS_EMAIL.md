# Solución de Problemas de Email

## Problema: Error al enviar correos electrónicos

Si experimentas errores al enviar correos electrónicos desde el panel de administración, sigue estos pasos para solucionarlo:

### 1. Verificar Variables de Entorno

Asegúrate de que tu archivo `.env` contenga las siguientes variables correctamente configuradas:

```env
# Configuración de Correo Electrónico
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
CORPORATE_EMAIL=empresa@monkeyfood.com
```

### 2. Configuración para Gmail

Si usas Gmail, necesitas:

1. **Activar la verificación en 2 pasos** en tu cuenta de Google
2. **Generar una contraseña de aplicación**:
   - Ve a tu cuenta de Google → Seguridad
   - En "Verificación en 2 pasos", selecciona "Contraseñas de aplicaciones"
   - Genera una nueva contraseña para "Correo"
   - Usa esta contraseña en `EMAIL_PASS`, NO tu contraseña normal

### 3. Configuración para Otros Proveedores

#### Outlook/Hotmail:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

#### Yahoo:
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

#### Proveedores SMTP personalizados:
Consulta la documentación de tu proveedor para obtener:
- Host SMTP
- Puerto (generalmente 587 para STARTTLS o 465 para SSL)
- Credenciales de autenticación

### 4. Errores Comunes y Soluciones

#### Error: "Invalid login"
- Verifica que `EMAIL_USER` y `EMAIL_PASS` sean correctos
- Para Gmail, asegúrate de usar una contraseña de aplicación
- Verifica que la cuenta no tenga bloqueado el acceso de aplicaciones menos seguras

#### Error: "Connection timeout"
- Verifica que `EMAIL_HOST` y `EMAIL_PORT` sean correctos
- Comprueba tu conexión a internet
- Algunos firewalls pueden bloquear puertos SMTP

#### Error: "Authentication failed"
- Verifica las credenciales
- Para Gmail, asegúrate de tener la verificación en 2 pasos activada
- Algunos proveedores requieren autorización específica para aplicaciones

### 5. Probar la Configuración

1. Accede al panel de administración con la contraseña: `Pecera@2025!`
2. Haz clic en "Test Email"
3. Introduce un email de prueba
4. Si recibes el correo, la configuración es correcta

### 6. Logs de Depuración

Si sigues teniendo problemas, revisa los logs del servidor:

```bash
# En el directorio del proyecto
npm start
```

Los errores de email aparecerán en la consola con detalles específicos.

### 7. Configuración de Seguridad Adicional

Para mayor seguridad en producción:

1. **Usa variables de entorno del sistema** en lugar del archivo `.env`
2. **Configura un servidor SMTP dedicado** para aplicaciones
3. **Implementa rate limiting** para evitar spam
4. **Usa dominios verificados** para mejorar la entregabilidad

### 8. Contacto de Soporte

Si después de seguir estos pasos sigues teniendo problemas:

1. Verifica que todas las variables de entorno estén configuradas
2. Prueba con un proveedor de email diferente
3. Consulta la documentación de tu proveedor SMTP
4. Considera usar servicios como SendGrid, Mailgun o Amazon SES para mayor confiabilidad

---

**Nota importante**: Nunca compartas tus credenciales de email reales. Usa siempre contraseñas de aplicación cuando estén disponibles.