# 🚨 Solución Rápida: Error de Envío de Email

## Problema
Error al enviar correo de prueba desde el panel de administración.

## ⚡ Solución en 3 Pasos

### 1. Configura tu Email Real
Edita el archivo `.env` y reemplaza:
```env
# ANTES (valores de ejemplo)
EMAIL_USER=tu_email_real@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion_16_caracteres

# DESPUÉS (tus valores reales)
EMAIL_USER=tuemailreal@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### 2. Genera Contraseña de Aplicación (Gmail)
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. **Seguridad** → **Verificación en 2 pasos** (actívala si no está)
3. **Contraseñas de aplicaciones** → **Generar nueva**
4. Selecciona **"Correo"**
5. Copia la contraseña de 16 caracteres
6. Pégala en `EMAIL_PASS`

### 3. Verifica la Configuración
```bash
# Ejecuta el script de verificación
node verificar_email.js
```

## 🧪 Probar el Email
1. Guarda el archivo `.env`
2. Reinicia el servidor: `npm start`
3. Ve al panel admin (contraseña: `Pecera@2025!`)
4. Haz clic en **"Test Email"**
5. Introduce tu email y envía

## ❌ Si Sigue Fallando

### Error "Invalid login":
- ✅ Verifica que uses tu email real
- ✅ Usa contraseña de aplicación, NO tu contraseña normal
- ✅ Activa verificación en 2 pasos

### Error "Connection timeout":
- ✅ Verifica conexión a internet
- ✅ Comprueba firewall/antivirus
- ✅ Usa `EMAIL_HOST=smtp.gmail.com` y `EMAIL_PORT=587`

### Otros Proveedores:

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=tuemailreal@outlook.com
EMAIL_PASS=tu_contraseña_normal
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=tuemailreal@yahoo.com
EMAIL_PASS=contraseña_de_aplicacion_yahoo
```

## 📁 Archivos de Ayuda
- `DIAGNOSTICO_EMAIL_ERROR.md` - Diagnóstico completo
- `SOLUCION_PROBLEMAS_EMAIL.md` - Guía detallada
- `verificar_email.js` - Script de verificación

## 🆘 Último Recurso
Si nada funciona, usa un servicio externo como SendGrid:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=tu_api_key_sendgrid
```

---
**💡 Tip:** El 90% de los problemas se resuelven configurando correctamente las credenciales de Gmail con contraseña de aplicación.