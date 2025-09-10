# Diagnóstico de Error de Envío de Correo

## 🚨 Error Detectado: Fallo al enviar correo de prueba

### Causas Más Probables

Basándome en la configuración actual, el error probablemente se debe a:

#### 1. **Credenciales de Email No Configuradas** ⚠️
Tu archivo `.env` contiene valores de ejemplo:
```env
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
```

**SOLUCIÓN INMEDIATA:**
1. Edita el archivo `.env`
2. Reemplaza `tu_email@gmail.com` por tu email real de Gmail
3. Reemplaza `tu_contraseña_de_aplicacion` por una contraseña de aplicación válida

#### 2. **Falta Contraseña de Aplicación de Gmail** 🔐
Si usas Gmail, NO puedes usar tu contraseña normal.

**PASOS PARA GENERAR CONTRASEÑA DE APLICACIÓN:**
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Seguridad → Verificación en 2 pasos (debe estar activada)
3. Contraseñas de aplicaciones → Generar nueva
4. Selecciona "Correo" como aplicación
5. Copia la contraseña generada (16 caracteres)
6. Úsala en `EMAIL_PASS`

### Configuración Correcta de Ejemplo

```env
# Configuración de Correo Electrónico
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tuemailreal@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Contraseña de aplicación de 16 caracteres
CORPORATE_EMAIL=empresa@monkeyfood.com
```

### Otros Proveedores de Email

#### Outlook/Hotmail:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=tuemailreal@outlook.com
EMAIL_PASS=tu_contraseña_normal  # Outlook permite contraseña normal
```

#### Yahoo:
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=tuemailreal@yahoo.com
EMAIL_PASS=contraseña_de_aplicacion  # Yahoo requiere contraseña de aplicación
```

### Verificación Paso a Paso

#### ✅ Checklist de Configuración:
- [ ] Email real configurado en `EMAIL_USER`
- [ ] Contraseña de aplicación configurada en `EMAIL_PASS`
- [ ] Verificación en 2 pasos activada (Gmail/Yahoo)
- [ ] Host y puerto correctos para tu proveedor
- [ ] Archivo `.env` guardado correctamente

#### 🧪 Probar la Configuración:
1. Guarda los cambios en `.env`
2. Reinicia el servidor: `npm start`
3. Accede al panel admin: contraseña `Pecera@2025!`
4. Haz clic en "Test Email"
5. Introduce tu email para la prueba

### Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| "Invalid login" | Credenciales incorrectas | Verificar email y contraseña de aplicación |
| "Connection timeout" | Host/puerto incorrecto | Verificar `EMAIL_HOST` y `EMAIL_PORT` |
| "Authentication failed" | Falta verificación en 2 pasos | Activar 2FA y generar contraseña de aplicación |
| "Less secure app access" | Configuración de seguridad | Usar contraseña de aplicación en lugar de contraseña normal |

### Logs de Depuración

Si el error persiste, revisa los logs del servidor:
```bash
cd "/Users/livepuntaumbria/MF COMPETITION/UPLOAD ALL THESE A GITHUB"
npm start
```

Los errores específicos aparecerán en la consola con detalles como:
- Código de error SMTP
- Mensaje de error del proveedor
- Detalles de conexión

### Configuración Alternativa (Servicios Externos)

Si sigues teniendo problemas, considera usar servicios especializados:

#### SendGrid (Recomendado para producción):
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=tu_api_key_de_sendgrid
```

#### Mailgun:
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@tu-dominio.mailgun.org
EMAIL_PASS=tu_contraseña_mailgun
```

### 🆘 Soporte Urgente

Si necesitas ayuda inmediata:
1. Verifica que tengas Node.js instalado
2. Asegúrate de que el archivo `.env` esté en la raíz del proyecto
3. Reinicia completamente el servidor después de cambios
4. Prueba con un email diferente como destinatario

---

**💡 Tip:** La mayoría de errores se resuelven configurando correctamente las credenciales de email. Gmail es el más fácil de configurar si sigues los pasos de contraseña de aplicación.