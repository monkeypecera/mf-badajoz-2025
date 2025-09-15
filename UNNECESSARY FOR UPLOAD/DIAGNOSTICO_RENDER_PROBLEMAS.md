# 🚨 Diagnóstico de Problemas en Render

## Problemas Identificados

### 1. ❌ Correo no se envía
### 2. ❌ No se cargan participantes desde la base de datos

---

## 🔍 Análisis de Problemas

### Problema 1: Email no funciona en Render

**Posibles causas:**

#### A) Variables de entorno faltantes o incorrectas
```env
# Verificar que estas variables estén en Render:
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=monkeypecera@gmail.com
EMAIL_PASS=xcsh hhbj cxfy flyt
CORPORATE_EMAIL=empresa@monkeyfood.com
```

#### B) Contraseña de aplicación de Gmail expirada
- Las contraseñas de aplicación pueden expirar
- Gmail puede revocar acceso por seguridad
- Verificar que la cuenta siga activa

#### C) Configuración de nodemailer incorrecta
- Puerto 587 requiere `secure: false`
- Algunos proveedores de hosting bloquean SMTP
- Render puede tener restricciones de red

### Problema 2: Base de datos no carga participantes

**Posibles causas:**

#### A) Conexión a MongoDB Atlas fallida
```env
# Verificar URI de MongoDB en Render:
MONGODB_URI=mongodb+srv://aaron:Noraa2025@monkeyfood.iduh2ro.mongodb.net/?retryWrites=true&w=majority&appName=MonkeyFood
```

#### B) Credenciales de MongoDB incorrectas
- Usuario: `aaron`
- Contraseña: `Noraa2025`
- Cluster: `monkeyfood.iduh2ro.mongodb.net`

#### C) Configuración de red en MongoDB Atlas
- IP de Render no está en whitelist
- Configuración de acceso de red restrictiva

---

## 🛠️ Soluciones Inmediatas

### Para el Problema de Email:

#### Solución 1: Verificar Variables en Render
1. Ir a Render Dashboard
2. Seleccionar tu servicio
3. Settings → Environment Variables
4. Verificar que todas las variables de email estén presentes:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=monkeypecera@gmail.com
   EMAIL_PASS=xcsh hhbj cxfy flyt
   CORPORATE_EMAIL=empresa@monkeyfood.com
   ```

#### Solución 2: Regenerar Contraseña de Aplicación
1. Ir a [myaccount.google.com](https://myaccount.google.com)
2. Seguridad → Contraseñas de aplicaciones
3. Eliminar la contraseña actual
4. Generar nueva contraseña
5. Actualizar `EMAIL_PASS` en Render
6. Hacer redeploy

#### Solución 3: Usar SendGrid (Alternativa)
```env
# En Render, cambiar a SendGrid:
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=TU_API_KEY_SENDGRID
```

### Para el Problema de Base de Datos:

#### Solución 1: Verificar Conexión MongoDB
1. En Render Dashboard → Environment Variables
2. Verificar `MONGODB_URI` exacta:
   ```
   MONGODB_URI=mongodb+srv://aaron:Noraa2025@monkeyfood.iduh2ro.mongodb.net/?retryWrites=true&w=majority&appName=MonkeyFood
   ```

#### Solución 2: Configurar MongoDB Atlas
1. Ir a [MongoDB Atlas](https://cloud.mongodb.com)
2. Network Access → Add IP Address
3. Agregar `0.0.0.0/0` (permitir todas las IPs)
4. O agregar IPs específicas de Render

#### Solución 3: Verificar Credenciales
1. En MongoDB Atlas → Database Access
2. Verificar que el usuario `aaron` existe
3. Verificar que la contraseña sea `Noraa2025`
4. Verificar permisos de lectura/escritura

---

## 🔧 Pasos de Verificación

### 1. Verificar Logs de Render
```bash
# En Render Dashboard:
# 1. Ir a tu servicio
# 2. Logs tab
# 3. Buscar errores como:
#    - "Error al conectar a MongoDB"
#    - "Error al enviar correo"
#    - "Authentication failed"
#    - "Connection timeout"
```

### 2. Probar Conexión MongoDB
Agregar logs temporales en `database/db.js`:
```javascript
const connectDB = async () => {
  try {
    console.log('Intentando conectar a MongoDB...');
    console.log('URI:', process.env.MONGODB_URI ? 'CONFIGURADA' : 'NO CONFIGURADA');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
};
```

### 3. Probar Envío de Email
Agregar logs en `emailService.js`:
```javascript
exports.sendTestEmail = async (email) => {
  try {
    console.log('Configuración de email:');
    console.log('HOST:', process.env.EMAIL_HOST);
    console.log('PORT:', process.env.EMAIL_PORT);
    console.log('USER:', process.env.EMAIL_USER);
    console.log('PASS:', process.env.EMAIL_PASS ? 'CONFIGURADA' : 'NO CONFIGURADA');
    
    // ... resto del código
  } catch (error) {
    console.error('❌ Error detallado:', error);
    return { success: false, error: error.message };
  }
};
```

---

## 🚀 Plan de Acción Inmediato

### Paso 1: Verificar Variables de Entorno
- [ ] Revisar todas las variables en Render
- [ ] Comparar con configuración local
- [ ] Verificar que no haya espacios extra o caracteres especiales

### Paso 2: Regenerar Credenciales
- [ ] Nueva contraseña de aplicación de Gmail
- [ ] Verificar credenciales de MongoDB Atlas
- [ ] Actualizar variables en Render

### Paso 3: Configurar Acceso de Red
- [ ] MongoDB Atlas: permitir todas las IPs
- [ ] Verificar que no haya firewall bloqueando

### Paso 4: Hacer Redeploy
- [ ] Después de cambios, hacer redeploy en Render
- [ ] Verificar logs durante el despliegue
- [ ] Probar funcionalidades

### Paso 5: Alternativas si Persiste
- [ ] Usar SendGrid para email
- [ ] Considerar otra base de datos
- [ ] Verificar configuración de Render

---

## 📞 Contactos de Soporte

- **Render Support**: [help.render.com](https://help.render.com)
- **MongoDB Atlas**: [support.mongodb.com](https://support.mongodb.com)
- **Gmail/Google**: [support.google.com](https://support.google.com)

---

**💡 Tip**: Los problemas más comunes en Render son variables de entorno mal configuradas y restricciones de red. Verificar logs es crucial para identificar el problema exacto.