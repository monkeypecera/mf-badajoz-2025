# 🚀 GUÍA COMPLETA DE DESPLIEGUE - MF BADAJOZ 2025
## Guía Paso a Paso para Tontos 😊

---

## 📋 ÍNDICE
1. [Preparación Inicial](#1-preparación-inicial)
2. [Configurar GitHub](#2-configurar-github)
3. [Configurar MongoDB Atlas (Base de Datos)](#3-configurar-mongodb-atlas)
4. [Configurar Gmail para Emails](#4-configurar-gmail-para-emails)
5. [Desplegar en Render (Hosting Gratuito)](#5-desplegar-en-render)
6. [Verificación Final](#6-verificación-final)
7. [Solución de Problemas](#7-solución-de-problemas)

---

## 1. PREPARACIÓN INICIAL

### ✅ Lo que necesitas:
- Una cuenta de Gmail
- Una cuenta de GitHub (gratis)
- Una cuenta de MongoDB Atlas (gratis)
- Una cuenta de Render (gratis)
- Esta carpeta con todos los archivos

### 📁 Verificar archivos:
Asegúrate de que tienes estos archivos en la carpeta:
- `package.json` ✓
- `server/index.js` ✓
- Carpeta `public/` con `index.html` ✓
- Carpeta `database/` con `init.js` ✓

---

## 2. CONFIGURAR GITHUB

### Paso 2.1: Crear repositorio
1. Ve a [github.com](https://github.com)
2. Haz clic en **"New repository"** (botón verde)
3. Nombre del repositorio: `mf-badajoz-2025`
4. Descripción: `Concurso Monkey Food Badajoz 2025`
5. Selecciona **"Public"** (gratis)
6. ✅ Marca **"Add a README file"**
7. Haz clic en **"Create repository"**

### Paso 2.2: Subir archivos
1. En tu repositorio, haz clic en **"uploading an existing file"**
2. Arrastra TODOS los archivos de esta carpeta
3. En "Commit changes":
   - Título: `Initial upload - MF Badajoz 2025`
   - Descripción: `Aplicación completa del concurso`
4. Haz clic en **"Commit changes"**

### ⏰ Tiempo estimado: 10 minutos

---

## 3. CONFIGURAR MONGODB ATLAS

### Paso 3.1: Crear cuenta
1. Ve a [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Haz clic en **"Try Free"**
3. Regístrate con tu Gmail
4. Selecciona **"M0 Sandbox"** (GRATIS)
5. Región: **"AWS / eu-west-1 (Ireland)"** (más cerca de España)
6. Nombre del cluster: `MonkeyFood`

### Paso 3.2: Configurar acceso
1. **Database Access**:
   - Haz clic en **"Add New Database User"**
   - Username: `mfadmin`
   - Password: `Pecera@2025!` (¡APÚNTALO!)
   - Database User Privileges: **"Read and write to any database"**
   - Haz clic en **"Add User"**

2. **Network Access**:
   - Haz clic en **"Add IP Address"**
   - Selecciona **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Haz clic en **"Confirm"**

### Paso 3.3: Obtener URL de conexión
1. Ve a **"Database"** → **"Connect"**
2. Selecciona **"Drivers"**
3. Driver: **"Node.js"**
4. Copia la URL que aparece (algo como):
   ```
   mongodb+srv://mfadmin:<password>@monkeyfood.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Reemplaza `<password>` por `Pecera@2025!`
6. Añade al final: `/monkeyfood`

**URL FINAL:**
```
mongodb+srv://mfadmin:Pecera@2025!@monkeyfood.xxxxx.mongodb.net/monkeyfood?retryWrites=true&w=majority
```

### ⏰ Tiempo estimado: 15 minutos

---

## 4. CONFIGURAR GMAIL PARA EMAILS

### Paso 4.1: Activar verificación en 2 pasos
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. **"Seguridad"** → **"Verificación en 2 pasos"**
3. Sigue los pasos para activarla

### Paso 4.2: Crear contraseña de aplicación
1. En **"Seguridad"** → **"Contraseñas de aplicaciones"**
2. Selecciona **"Correo"** y **"Otro"**
3. Nombre: `Monkey Food Badajoz`
4. Copia la contraseña de 16 caracteres (ej: `abcd efgh ijkl mnop`)
5. ¡APÚNTALA! La necesitarás después

### ⏰ Tiempo estimado: 10 minutos

---

## 5. DESPLEGAR EN RENDER

### Paso 5.1: Crear cuenta en Render
1. Ve a [render.com](https://render.com)
2. Haz clic en **"Get Started for Free"**
3. Regístrate con GitHub (más fácil)
4. Autoriza a Render para acceder a tus repositorios

### Paso 5.2: Crear Web Service
1. En el dashboard, haz clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio `mf-badajoz-2025`
4. Haz clic en **"Connect"**

### Paso 5.3: Configurar el servicio
**Configuración básica:**
- **Name:** `mf-badajoz-2025`
- **Region:** `Frankfurt (EU Central)`
- **Branch:** `main`
- **Root Directory:** (dejar vacío)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Plan:**
- Selecciona **"Free"** (0$/mes)
- ✅ Acepta las limitaciones del plan gratuito

### Paso 5.4: Variables de entorno
En **"Environment Variables"**, añade estas variables:

```
PORT=10000
NODE_ENV=production
MONGODB_URI=mongodb+srv://mfadmin:Pecera@2025!@monkeyfood.xxxxx.mongodb.net/monkeyfood?retryWrites=true&w=majority
JWT_SECRET=MF2025BadajozSuperSecretKey!@#$%
ADMIN_PASSWORD=AdminMF2025!
GMAIL_USER=monkeypecera@gmail.com
GMAIL_PASS=abcd efgh ijkl mnop
```

**⚠️ IMPORTANTE:**
- Reemplaza `MONGODB_URI` con tu URL real de MongoDB
- Reemplaza `GMAIL_USER` con monkeypecera@gmail.com
- Reemplaza `GMAIL_PASS` con la contraseña de aplicación de Gmail

### Paso 5.5: Desplegar
1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir tu aplicación
3. Espera 5-10 minutos (verás los logs en tiempo real)
4. Cuando termine, verás **"Your service is live at https://mf-badajoz-2025.onrender.com"**

### ⏰ Tiempo estimado: 20 minutos

---

## 6. VERIFICACIÓN FINAL

### Paso 6.1: Probar la aplicación
1. Abre tu URL de Render (ej: `https://mf-badajoz-2025.onrender.com`)
2. Deberías ver la página principal del concurso
3. Prueba a participar con datos de prueba
4. Verifica que llegue el email de confirmación

### Paso 6.2: Probar el panel de administración
1. Ve a `https://tu-url.onrender.com/admin.html`
2. Contraseña: `AdminMF2025!`
3. Verifica que puedas ver las estadísticas
4. Prueba a resetear la base de datos

### Paso 6.3: Inicializar premios
1. En el panel de admin, haz clic en **"Inicializar Premios"**
2. Esto creará los 5,000 participaciones (4,000 no premiados + 1,000 premios ganadores) en la base de datos
3. Verifica que aparezcan las estadísticas correctas

### ⏰ Tiempo estimado: 15 minutos

---

## 7. SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Application failed to respond"
**Solución:**
1. Ve a los logs de Render
2. Busca errores de conexión a MongoDB
3. Verifica que la URL de MongoDB sea correcta
4. Asegúrate de que la IP esté permitida en MongoDB Atlas

### ❌ Error: "Cannot send email"
**Solución:**
1. Verifica que `GMAIL_USER` y `GMAIL_PASS` sean correctos
2. Asegúrate de que la verificación en 2 pasos esté activada
3. Regenera la contraseña de aplicación si es necesario

### ❌ Error: "Build failed"
**Solución:**
1. Verifica que `package.json` esté en la raíz del repositorio
2. Asegúrate de que el comando de build sea `npm install`
3. Revisa los logs para errores específicos

### ❌ La aplicación es muy lenta
**Explicación:**
Render gratuito "duerme" la aplicación después de 15 minutos de inactividad. La primera visita después del "sueño" puede tardar 30-60 segundos.

**Soluciones:**
1. **Upgrade a plan de pago** ($7/mes) para evitar el "sueño"
2. **Usar un servicio de ping** como UptimeRobot (gratis) para mantener la app activa
3. **Avisar a los participantes** que la primera carga puede ser lenta

---

## 🎯 RESUMEN FINAL

### ✅ Lo que tienes ahora:
- ✅ Aplicación web funcionando 24/7
- ✅ Base de datos MongoDB con 5,000 participaciones (1,000 premios ganadores)
- ✅ Sistema de emails automático
- ✅ Panel de administración
- ✅ Todo completamente GRATIS

### 📊 Capacidad del plan gratuito:
- **Render:** 750 horas/mes (suficiente para el concurso)
- **MongoDB:** 512MB de almacenamiento (suficiente para 50,000+ participantes)
- **Gmail:** 500 emails/día (más que suficiente)

### 🔗 URLs importantes:
- **Aplicación:** `https://tu-nombre.onrender.com`
- **Admin:** `https://tu-nombre.onrender.com/admin.html`
- **GitHub:** `https://github.com/tu-usuario/mf-badajoz-2025`

### 📱 Compartir con participantes:
```
🐒 ¡CONCURSO MONKEY FOOD BADAJOZ 2025! 🍔

🎁 1,000 premios ganadores esperándote:
• 50 Hamburguesas clásicas GRATIS (1%)
• 50 Patatas GRATIS (1%)
• 500 Descuentos del 5% (10%)
• 300 Descuentos del 10% (6%)
• 100 Descuentos del 20% (2%)
• 50 Hamburguesas GRATIS
• 50 Patatas GRATIS  
• 500 Descuentos del 5%
• 300 Descuentos del 10%
• 100 Descuentos del 20%

👉 Participa aquí: https://tu-url.onrender.com

¡Solo necesitas tu email y teléfono!
#MonkeyFoodBadajoz #Concurso2025
```

---

## 🆘 CONTACTO DE EMERGENCIA

Si algo no funciona:
1. Revisa esta guía paso a paso
2. Consulta la sección de "Solución de Problemas"
3. Verifica los logs en Render
4. Asegúrate de que todas las variables de entorno estén correctas

**¡Tu aplicación está lista para recibir miles de participantes!** 🚀

---

*Creado para MF Badajoz 2025 - Guía completa de despliegue gratuito*