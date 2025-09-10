# 🚨 Solución Error MongoDB

## ❌ Error Detectado

```
Error al conectar a MongoDB: URI must include hostname, domain name, and tld
```

**Causa:** Falta configurar la variable de entorno `MONGODB_URI` en Render.

## ✅ Solución Rápida

Necesitas añadir una base de datos MongoDB y configurar la variable de entorno en Render.

## 1️⃣ Añadir Base de Datos MongoDB

1. Ve a tu dashboard de Render: [dashboard.render.com](https://dashboard.render.com)
2. En tu proyecto, haz clic en **"New +"**
3. Selecciona **"Database"**
4. Elige **"MongoDB"**
5. Configura:
   - **Name:** monkey-food-db
   - **Database User:** admin
   - **Region:** Oregon (US West) - recomendado
   - **Plan:** Free (para pruebas)
6. Haz clic en **"Create Database"**

## 2️⃣ Obtener la URI de Conexión

1. Una vez creada la base de datos, ve a la pestaña **"Connect"**
2. Copia la **"External Connection String"**
3. Debería verse así:
   ```
   mongodb://admin:PASSWORD@dpg-xxxxx-a.oregon-postgres.render.com/monkey_food_db
   ```

## 3️⃣ Configurar Variables de Entorno

1. Ve a tu servicio web (tu aplicación)
2. Haz clic en **"Environment"** en el menú lateral
3. Añade estas variables:

```env
MONGODB_URI=mongodb://admin:TU_PASSWORD@dpg-xxxxx-a.oregon-postgres.render.com/monkey_food_db
NODE_ENV=production
PORT=10000
JWT_SECRET=tu-clave-secreta-muy-segura-2025
ADMIN_PASSWORD=AdminMF2025!
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-gmail
EMAIL_FROM=noreply@monkeyfood.com
```

4. Haz clic en **"Save Changes"**

## 4️⃣ Redesplegar la Aplicación

1. Ve a la pestaña **"Deploys"**
2. Haz clic en **"Manual Deploy"**
3. Selecciona **"Deploy latest commit"**
4. Espera a que termine el despliegue ⏳

## ⚠️ Configuración de Email (Opcional)

Para que funcionen las notificaciones por email:

1. Ve a tu [cuenta de Google](https://myaccount.google.com/security)
2. Activa la verificación en 2 pasos
3. Ve a "Contraseñas de aplicaciones"
4. Genera una contraseña para "Correo"
5. Usa esa contraseña en `EMAIL_PASS`

## 🎉 ¡Verificar que Funciona!

Después del redespliegue, deberías ver:

```
Servidor corriendo en el puerto 10000
✅ Conectado a MongoDB exitosamente
```

Tu aplicación estará disponible en: **https://tu-app.onrender.com**

## 🔧 Próximos Pasos

1. Accede a tu aplicación: `https://tu-app.onrender.com`
2. Ve al panel de admin: `https://tu-app.onrender.com/admin.html`
3. Usa la contraseña: **AdminMF2025!**
4. Haz clic en **"Inicializar Premios"**
5. ¡Tu concurso estará listo! 🎯

---

**🐒 Monkey Food Competition 2025**  
¡Problema resuelto! Tu aplicación ya debería funcionar correctamente.