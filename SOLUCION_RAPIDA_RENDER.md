# ⚡ SOLUCIÓN RÁPIDA - Problemas en Render

## 🚨 PROBLEMAS ACTUALES
- ❌ **Correo no se envía**
- ❌ **No se cargan participantes desde la base de datos**

---

## 🎯 SOLUCIÓN EN 5 PASOS

### PASO 1: Ejecutar Diagnóstico (2 minutos)

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Selecciona tu servicio → **Shell**
3. Ejecuta:
```bash
node verificar_render.js
```
4. **Anota los errores** que aparezcan

### PASO 2: Verificar Variables de Entorno (3 minutos)

1. En Render: **Settings** → **Environment Variables**
2. **Verificar que existan TODAS estas variables:**

```env
MONGODB_URI=mongodb+srv://aaron:Noraa2025@monkeyfood.iduh2ro.mongodb.net/?retryWrites=true&w=majority&appName=MonkeyFood
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=monkeypecera@gmail.com
EMAIL_PASS=xcsh hhbj cxfy flyt
CORPORATE_EMAIL=empresa@monkeyfood.com
ADMIN_PASSWORD=Pecera@2025!
JWT_SECRET=MF2025BadajozSuperSecretKey!@#$%
```

3. **Si falta alguna**: Agregarla exactamente como está arriba
4. **Save Changes**

### PASO 3: Configurar MongoDB Atlas (2 minutos)

1. Ve a [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → **Add IP Address**
3. Seleccionar **"Allow access from anywhere"** (0.0.0.0/0)
4. **Confirm**

### PASO 4: Regenerar Contraseña Gmail (3 minutos)

1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. **Seguridad** → **Contraseñas de aplicaciones**
3. **Eliminar** la contraseña actual
4. **Generar nueva** contraseña de aplicación
5. **Copiar** la nueva contraseña (16 caracteres)
6. En Render: Editar `EMAIL_PASS` con la nueva contraseña
7. **Save Changes**

### PASO 5: Verificar Solución (2 minutos)

1. Esperar a que Render redepliegue (automático)
2. En Render Shell, ejecutar:
```bash
node test_render_funcionalidades.js
```
3. **Debe mostrar**: ✅ MongoDB OK, ✅ Registro OK, ✅ Email OK

---

## 🔥 SI SIGUE SIN FUNCIONAR

### Alternativa Email: SendGrid (5 minutos)

1. Crear cuenta en [SendGrid](https://sendgrid.com) (gratis)
2. Generar **API Key**
3. En Render, cambiar variables:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=TU_SENDGRID_API_KEY
```

### Verificar Logs de Render

1. Render Dashboard → **Logs**
2. Buscar errores como:
   - `authentication failed`
   - `connection timeout`
   - `Invalid login`

---

## ✅ CHECKLIST RÁPIDO

- [ ] Diagnóstico ejecutado
- [ ] Variables de entorno verificadas
- [ ] MongoDB Atlas permite acceso desde cualquier IP
- [ ] Nueva contraseña de Gmail generada
- [ ] Test de funcionalidades exitoso
- [ ] Aplicación funciona correctamente

---

## 📞 AYUDA URGENTE

Si después de estos pasos sigue sin funcionar:

1. **Copia los logs de error** de Render
2. **Ejecuta el diagnóstico** y copia el resultado
3. **Revisa** el archivo `INSTRUCCIONES_RENDER_SOLUCION.md` para más detalles

---

## 🎉 RESULTADO ESPERADO

Después de completar estos pasos:
- ✅ Los participantes se registran correctamente
- ✅ Se envían emails a los ganadores
- ✅ El panel de admin muestra todos los participantes
- ✅ La base de datos funciona sin errores

**⏱️ Tiempo total estimado: 15 minutos**