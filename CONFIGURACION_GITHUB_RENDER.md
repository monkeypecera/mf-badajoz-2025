# 🚀 Configuración GitHub + Render - Monkey Food

## 📋 Variables de Entorno para Render

Copia y pega estas variables en tu dashboard de Render:

```env
MONGODB_URI=mongodb+srv://aaron:Noraa2025@monkeyfood.iduh2ro.mongodb.net/?retryWrites=true&w=majority&appName=MonkeyFood
NODE_ENV=production
PORT=10000
JWT_SECRET=MonkeyFood-SecretKey-2025-Production
ADMIN_PASSWORD=AdminMF2025!
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-gmail
EMAIL_FROM=noreply@monkeyfood.com
```

## 🔧 Pasos para Configurar en Render

### 1. Crear Servicio Web
1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name:** monkey-food-competition
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Node Version:** 18 o superior

### 2. Configurar Variables de Entorno
1. Ve a **"Environment"** en el menú lateral
2. Añade todas las variables de arriba
3. Haz clic en **"Save Changes"**

### 3. Desplegar
1. Haz clic en **"Manual Deploy"**
2. Selecciona **"Deploy latest commit"**
3. Espera a que termine el despliegue

## 📝 Comandos Git para Subir a GitHub

```bash
# Inicializar repositorio
git init

# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "Monkey Food Competition - Ready for production"

# Configurar rama principal
git branch -M main

# Añadir repositorio remoto (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/monkey-food-competition.git

# Subir a GitHub
git push -u origin main
```

## ✅ Verificación Post-Despliegue

Después del despliegue exitoso, deberías ver:

```
Servidor corriendo en el puerto 10000
✅ Conectado a MongoDB exitosamente
```

## 🎯 URLs Importantes

- **Aplicación:** `https://tu-app.onrender.com`
- **Panel Admin:** `https://tu-app.onrender.com/admin.html`
- **Términos:** `https://tu-app.onrender.com/terms.html`

## 🔑 Credenciales

- **Admin Password:** `AdminMF2025!`
- **Database:** Ya configurada con tu MongoDB Atlas

## 📧 Configuración Email (Opcional)

Para activar notificaciones por email:

1. Ve a [Google Account Security](https://myaccount.google.com/security)
2. Activa verificación en 2 pasos
3. Genera contraseña de aplicación para "Correo"
4. Actualiza `EMAIL_USER` y `EMAIL_PASS` en Render

## 🎮 Inicializar Premios

Una vez desplegado:

1. Ve a `https://tu-app.onrender.com/admin.html`
2. Introduce contraseña: `AdminMF2025!`
3. Haz clic en **"Inicializar Premios"**
4. ¡Tu concurso estará listo!

---

**🐒 Monkey Food Competition 2025**  
¡Tu aplicación está lista para conquistar internet!