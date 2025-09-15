# 📋 Guía de Instalación Completa - Monkey Food Competition

## 🎯 Índice
1. [Prerrequisitos](#prerrequisitos)
2. [Configuración Local](#configuración-local)
3. [Configuración MongoDB Atlas](#configuración-mongodb-atlas)
4. [Configuración Email](#configuración-email)
5. [Despliegue en Render](#despliegue-en-render)
6. [Configuración WordPress](#configuración-wordpress)
7. [Verificación y Testing](#verificación-y-testing)
8. [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Prerrequisitos

### Software Necesario
- **Node.js 16+** - [Descargar aquí](https://nodejs.org/)
- **Git** - [Descargar aquí](https://git-scm.com/)
- **Editor de código** (VS Code recomendado)

### Cuentas Necesarias
- **GitHub** - Para alojar el código
- **MongoDB Atlas** - Base de datos (gratuita)
- **Render** - Hosting (gratuito)
- **Gmail** - Para envío de emails

---

## 💻 Configuración Local

### 1. Clonar el Repositorio
```bash
# Clonar desde GitHub
git clone https://github.com/tu-usuario/monkey-food-competition.git
cd monkey-food-competition

# Verificar que estás en la carpeta correcta
ls -la
```

### 2. Instalar Dependencias
```bash
# Instalar todas las dependencias
npm install

# Verificar instalación
npm list --depth=0
```

### 3. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar con tu editor favorito
nano .env
# o
code .env
```

**Contenido del archivo `.env`:**
```env
# ===========================================
# CONFIGURACIÓN MONGODB
# ===========================================
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/monkeyfood?retryWrites=true&w=majority

# ===========================================
# CONFIGURACIÓN EMAIL (GMAIL)
# ===========================================
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-16-caracteres

# ===========================================
# CONFIGURACIÓN ADMIN
# ===========================================
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-password-super-seguro

# ===========================================
# CONFIGURACIÓN SERVIDOR
# ===========================================
PORT=3000
NODE_ENV=development
```

---

## 🗄️ Configuración MongoDB Atlas

### 1. Crear Cuenta y Cluster
1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto: "Monkey Food Competition"
4. Crea un cluster gratuito (M0)

### 2. Configurar Acceso
```bash
# En MongoDB Atlas:
# 1. Database Access → Add New Database User
#    - Username: monkeyfood
#    - Password: [genera una segura]
#    - Role: Read and write to any database

# 2. Network Access → Add IP Address
#    - IP: 0.0.0.0/0 (acceso desde cualquier lugar)
#    - Comment: "Render deployment access"
```

### 3. Obtener URI de Conexión
```bash
# En MongoDB Atlas:
# 1. Clusters → Connect → Connect your application
# 2. Driver: Node.js, Version: 4.1 or later
# 3. Copiar la URI y reemplazar <password>

# Ejemplo de URI:
# mongodb+srv://monkeyfood:<password>@cluster0.abc123.mongodb.net/monkeyfood?retryWrites=true&w=majority
```

### 4. Inicializar Base de Datos
```bash
# Ejecutar script de inicialización
node database/init.js

# Deberías ver:
# ✅ Conectado a MongoDB
# ✅ Premios inicializados correctamente
# ✅ Base de datos lista
```

---

## 📧 Configuración Email

### 1. Configurar Gmail
```bash
# Pasos en Gmail:
# 1. Ir a Configuración de cuenta Google
# 2. Seguridad → Verificación en 2 pasos (activar)
# 3. Contraseñas de aplicaciones → Generar nueva
# 4. Seleccionar "Correo" y "Otro (nombre personalizado)"
# 5. Nombre: "Monkey Food Competition"
# 6. Copiar la contraseña de 16 caracteres
```

### 2. Probar Configuración Email
```bash
# Crear archivo de prueba
cat > test-email.js << 'EOF'
require('dotenv').config();
const { sendTestEmail } = require('./server/utils/emailService');

async function testEmail() {
  try {
    const result = await sendTestEmail('tu-email@gmail.com');
    console.log('✅ Email enviado correctamente:', result);
  } catch (error) {
    console.error('❌ Error enviando email:', error.message);
  }
}

testEmail();
EOF

# Ejecutar prueba
node test-email.js

# Limpiar archivo de prueba
rm test-email.js
```

---

## 🚀 Despliegue en Render

### 1. Preparar Repositorio GitHub
```bash
# Subir código a GitHub
git add .
git commit -m "Initial commit - Monkey Food Competition"
git branch -M main
git remote add origin https://github.com/tu-usuario/monkey-food-competition.git
git push -u origin main
```

### 2. Crear Servicio en Render
1. Ve a [Render](https://render.com)
2. Conecta tu cuenta GitHub
3. **New → Web Service**
4. Conecta tu repositorio
5. Configuración:
   ```
   Name: monkey-food-competition
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

### 3. Configurar Variables de Entorno en Render
```bash
# En Render Dashboard → Environment:
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/monkeyfood
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-password-seguro
PORT=3000
NODE_ENV=production
```

### 4. Deploy y Verificación
```bash
# Render desplegará automáticamente
# URL será algo como: https://monkey-food-competition.onrender.com

# Verificar deployment:
# 1. Logs en Render Dashboard
# 2. Acceder a la URL
# 3. Probar funcionalidad básica
```

---

## 🖼️ Configuración WordPress

### 1. Código Iframe para WordPress
```html
<!-- Código para insertar en WordPress -->
<div style="width: 100%; max-width: 800px; margin: 0 auto;">
  <iframe 
    src="https://tu-app.onrender.com" 
    width="100%" 
    height="600" 
    frameborder="0" 
    allowfullscreen
    style="border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    Tu navegador no soporta iframes. 
    <a href="https://tu-app.onrender.com" target="_blank">Haz clic aquí para participar</a>
  </iframe>
</div>
```

### 2. Insertar en WordPress
```bash
# Métodos de inserción:

# Método 1: Editor de bloques (Gutenberg)
# 1. Añadir bloque → HTML personalizado
# 2. Pegar el código iframe

# Método 2: Editor clásico
# 1. Cambiar a vista "Texto"
# 2. Pegar el código iframe

# Método 3: Widget
# 1. Apariencia → Widgets
# 2. Añadir widget "HTML personalizado"
# 3. Pegar el código iframe
```

---

## ✅ Verificación y Testing

### 1. Test Local
```bash
# Ejecutar localmente
npm start

# Verificar en navegador:
# http://localhost:3000 - Página principal
# http://localhost:3000/admin.html - Panel admin
# http://localhost:3000/iframe-test.html - Test iframe
```

### 2. Test de Funcionalidades
```bash
# Checklist de verificación:
# ✅ Página principal carga correctamente
# ✅ Formulario de participación funciona
# ✅ Sistema anti-fraude (no permite participar 2 veces)
# ✅ Panel admin accesible con credenciales
# ✅ Estadísticas se muestran correctamente
# ✅ Test de email funciona
# ✅ Exportación de participantes funciona
# ✅ Iframe se embebe correctamente
```

### 3. Test de Producción
```bash
# En Render URL:
# 1. Probar todas las funcionalidades
# 2. Verificar logs en Render Dashboard
# 3. Probar desde diferentes dispositivos
# 4. Verificar iframe en WordPress
```

---

## 🔧 Solución de Problemas

### Error: "Cannot connect to MongoDB"
```bash
# Verificaciones:
# 1. URI correcta en .env
# 2. Usuario y password correctos
# 3. IP whitelisted en MongoDB Atlas
# 4. Cluster activo

# Test de conexión:
node -e "require('dotenv').config(); console.log('URI:', process.env.MONGODB_URI);"
```

### Error: "Email not sending"
```bash
# Verificaciones:
# 1. Contraseña de aplicación (no la normal)
# 2. 2FA activado en Gmail
# 3. Variables EMAIL_USER y EMAIL_PASS correctas

# Test manual:
node test-email.js
```

### Error: "Port already in use"
```bash
# Cambiar puerto:
echo "PORT=3001" >> .env

# O matar proceso:
lsof -ti:3000 | xargs kill -9
```

### Error: "Iframe blocked"
```bash
# Verificar headers en navegador:
# F12 → Network → Headers
# Buscar: X-Frame-Options y Content-Security-Policy

# Deberían estar configurados para permitir iframe
```

### Error de Render: "Build failed"
```bash
# Verificaciones:
# 1. package.json tiene start script
# 2. Node version compatible
# 3. Variables de entorno configuradas
# 4. Logs de build en Render Dashboard
```

---

## 📞 Soporte Adicional

### Recursos Útiles
- [Documentación MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Documentación Render](https://render.com/docs)
- [Configuración Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [WordPress iframe embedding](https://wordpress.org/support/article/embeds/)

### Contacto
- 📧 Email: soporte@monkeyfood.es
- 🐛 Issues: GitHub Issues del repositorio
- 📖 Documentación adicional: Ver `USER_GUIDE.md`

---

**¡Instalación completada! 🎉**

*Si sigues todos estos pasos, tendrás tu concurso Monkey Food funcionando perfectamente en producción.*