# 🚀 Instrucciones para Solucionar Problemas en Render

## 🎯 Objetivo
Solucionar los problemas de:
1. ❌ Correo no se envía
2. ❌ No se cargan participantes desde la base de datos

---

## 📋 PASO 1: Ejecutar Diagnóstico en Render

### 1.1 Acceder a Render Shell
1. Ve a tu [Render Dashboard](https://dashboard.render.com)
2. Selecciona tu servicio web
3. Ve a la pestaña **"Shell"**
4. Ejecuta el script de diagnóstico:

```bash
node verificar_render.js
```

### 1.2 Interpretar Resultados
El script te mostrará:
- ✅ Variables configuradas correctamente
- ❌ Variables faltantes o incorrectas
- 🗄️ Estado de conexión a MongoDB
- 📧 Estado de configuración de email

---

## 🛠️ PASO 2: Soluciones Específicas

### Problema A: Variables de Entorno Faltantes

**Si el diagnóstico muestra variables faltantes:**

1. En Render Dashboard → Tu servicio → **Settings**
2. Scroll hasta **Environment Variables**
3. Agregar/verificar estas variables:

```env
# Base de datos
MONGODB_URI=mongodb+srv://aaron:Noraa2025@monkeyfood.iduh2ro.mongodb.net/?retryWrites=true&w=majority&appName=MonkeyFood

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=monkeypecera@gmail.com
EMAIL_PASS=xcsh hhbj cxfy flyt
CORPORATE_EMAIL=empresa@monkeyfood.com

# Seguridad
ADMIN_PASSWORD=Pecera@2025!
JWT_SECRET=MF2025BadajozSuperSecretKey!@#$%

# Opcional
NODE_ENV=production
PORT=3000
```

4. Hacer clic en **"Save Changes"**
5. Esperar a que se redepliegue automáticamente

### Problema B: MongoDB No Conecta

**Si el diagnóstico muestra error de MongoDB:**

#### B.1 Verificar MongoDB Atlas
1. Ve a [MongoDB Atlas](https://cloud.mongodb.com)
2. Inicia sesión con tus credenciales
3. Selecciona tu cluster **"MonkeyFood"**

#### B.2 Configurar Acceso de Red
1. En Atlas: **Network Access** (menú izquierdo)
2. Clic en **"Add IP Address"**
3. Seleccionar **"Allow access from anywhere"** (0.0.0.0/0)
4. Clic en **"Confirm"**

#### B.3 Verificar Usuario de Base de Datos
1. En Atlas: **Database Access** (menú izquierdo)
2. Verificar que existe el usuario **"aaron"**
3. Si no existe, crear nuevo usuario:
   - Username: `aaron`
   - Password: `Noraa2025`
   - Database User Privileges: **"Read and write to any database"**

#### B.4 Verificar URI de Conexión
1. En Atlas: **Clusters** → **Connect**
2. **"Connect your application"**
3. Copiar la URI y verificar que coincida con la variable `MONGODB_URI` en Render

### Problema C: Email No Funciona

**Si el diagnóstico muestra error de email:**

#### C.1 Regenerar Contraseña de Aplicación de Gmail
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. **Seguridad** → **Verificación en 2 pasos**
3. **Contraseñas de aplicaciones**
4. Eliminar la contraseña actual para "MonkeyFood"
5. Generar nueva contraseña de aplicación:
   - Nombre: "MonkeyFood Render"
   - Copiar la nueva contraseña (16 caracteres)

#### C.2 Actualizar Variable en Render
1. En Render: Settings → Environment Variables
2. Editar `EMAIL_PASS`
3. Pegar la nueva contraseña de aplicación
4. Save Changes

#### C.3 Alternativa: Usar SendGrid
**Si Gmail sigue fallando:**

1. Crear cuenta en [SendGrid](https://sendgrid.com)
2. Generar API Key
3. En Render, cambiar variables:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=TU_SENDGRID_API_KEY
```

---

## 🔄 PASO 3: Verificar Solución

### 3.1 Redeploy Manual (si es necesario)
1. En Render Dashboard → Tu servicio
2. **Manual Deploy** → **Deploy latest commit**
3. Esperar a que termine el despliegue

### 3.2 Ejecutar Diagnóstico Nuevamente
```bash
node verificar_render.js
```

### 3.3 Probar Funcionalidades
1. **Probar registro de participante:**
   - Ir a tu sitio web en Render
   - Registrar un nuevo participante
   - Verificar que aparezca en el panel de admin

2. **Probar envío de email:**
   - Registrar participante con email real
   - Verificar que llegue el correo
   - Verificar que llegue notificación a `empresa@monkeyfood.com`

---

## 📊 PASO 4: Monitorear Logs

### 4.1 Ver Logs en Tiempo Real
1. En Render Dashboard → Tu servicio
2. Pestaña **"Logs"**
3. Buscar mensajes como:
   - `✅ MongoDB conectado`
   - `✅ Premios inicializados`
   - `❌ Error al conectar`
   - `❌ Error al enviar correo`

### 4.2 Logs Importantes a Buscar
```
# Conexión exitosa:
✅ MongoDB conectado: monkeyfood.iduh2ro.mongodb.net
Premios inicializados correctamente

# Errores comunes:
❌ Error al conectar a MongoDB: authentication failed
❌ Error al enviar correo: Invalid login
❌ MongoNetworkError: connection timeout
```

---

## 🆘 PASO 5: Si Persisten los Problemas

### 5.1 Verificar Estado de Servicios
- **MongoDB Atlas**: [status.mongodb.com](https://status.mongodb.com)
- **Gmail**: [status.google.com](https://status.google.com)
- **Render**: [status.render.com](https://status.render.com)

### 5.2 Contactar Soporte
- **Render**: [help.render.com](https://help.render.com)
- **MongoDB**: [support.mongodb.com](https://support.mongodb.com)

### 5.3 Alternativas Temporales
- **Email**: Usar SendGrid, Mailgun, o AWS SES
- **Base de datos**: Verificar si hay límites de conexión

---

## ✅ Checklist Final

- [ ] Variables de entorno configuradas en Render
- [ ] MongoDB Atlas permite acceso desde cualquier IP
- [ ] Usuario de MongoDB tiene permisos correctos
- [ ] Contraseña de aplicación de Gmail regenerada
- [ ] Diagnóstico ejecutado sin errores
- [ ] Registro de participantes funciona
- [ ] Envío de emails funciona
- [ ] Panel de admin muestra participantes
- [ ] Logs no muestran errores

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu aplicación en Render debería funcionar correctamente con:
- ✅ Envío de correos
- ✅ Carga de participantes desde MongoDB
- ✅ Panel de administración funcional

**💡 Tip**: Guarda este documento para futuras referencias y mantenimiento.