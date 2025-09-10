# 🐒 Monkey Food Competition - Production Ready

¡Proyecto listo para subir online! Este folder contiene todos los archivos necesarios para desplegar la competición de Monkey Food en la nube.

## 🚀 Despliegue Rápido (Railway - Recomendado)

### 1. Subir a GitHub
```bash
git init
git add .
git commit -m "Monkey Food Competition - Ready for production"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/monkey-food-competition.git
git push -u origin main
```

### 2. Desplegar en Railway
1. Ir a [Railway.app](https://railway.app)
2. Crear cuenta (gratis)
3. "New Project" > "Deploy from GitHub repo"
4. Seleccionar tu repositorio
5. Añadir base de datos: "+ New" > "Database" > "Add MongoDB"

### 3. Configurar Variables de Entorno
En Railway > Settings > Environment Variables:
```
PORT=3000
NODE_ENV=production
MONGODB_URI=${{MongoDB.DATABASE_URL}}
JWT_SECRET=tu-clave-secreta-muy-segura-para-produccion
ADMIN_PASSWORD=admin123
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-gmail
EMAIL_FROM=noreply@monkeyfood.com
```

### 4. ¡Listo!
Tu aplicación estará disponible en: `https://tu-app.up.railway.app`

## 📧 Configuración de Email

### Gmail App Password
1. Ir a [Google Account](https://myaccount.google.com)
2. Security > 2-Step Verification (activar)
3. Security > App passwords
4. Generar password para "Mail"
5. Usar ese password en `EMAIL_PASS`

## 🔧 URLs Importantes

- **Página Principal:** `https://tu-dominio.com`
- **Panel Admin:** `https://tu-dominio.com/admin.html`
- **Términos:** `https://tu-dominio.com/terms.html`

## 🔑 Credenciales por Defecto

- **Admin Password:** `admin123` (cambiar en variables de entorno)
- **Base de datos:** Se crea automáticamente

## 📊 Configuración de Premios

Los premios están configurados en `server/controllers/prizeController.js`:
- 🍔 Hamburguesa Gratis: 5% (250 premios)
- 🍟 Patatas Gratis: 5% (250 premios)
- 💰 Descuento 10%: 80% (4000 premios)
- 💰 Descuento 20%: 10% (500 premios)

## 🛠️ Estructura del Proyecto

```
FINAL_PROJECT_TO_UPLOAD/
├── public/                 # Frontend files
│   ├── index.html         # Main page
│   ├── admin.html         # Admin panel
│   ├── terms.html         # Terms & conditions
│   ├── css/               # Styles
│   ├── js/                # JavaScript
│   └── images/            # Images and assets
├── server/                # Backend Node.js
│   ├── index.js           # Main server file
│   ├── controllers/       # Business logic
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── middleware/        # Custom middleware
├── database/              # Database scripts
├── package.json           # Dependencies
├── .env.example           # Environment variables template
└── README.md              # This file
```

## 🔒 Seguridad

- ✅ Validación de datos
- ✅ Protección CSRF
- ✅ Sanitización SQL
- ✅ Rate limiting
- ✅ Identificación única por dispositivo
- ✅ SSL/HTTPS automático

## 📱 Características

- ✅ Responsive design
- ✅ Sistema de premios aleatorio
- ✅ Panel de administración
- ✅ Notificaciones por email
- ✅ Prevención de participación múltiple
- ✅ Términos y condiciones
- ✅ Branding completo de Monkey Food

## 🆘 Soporte

Si tienes problemas:
1. Revisa las variables de entorno
2. Verifica la conexión a la base de datos
3. Consulta los logs en tu plataforma de hosting
4. Revisa la guía completa: `ONLINE_DEPLOYMENT_GUIDE.html`

---

**¡Tu competición Monkey Food está lista para conquistar internet! 🚀**

Creado con ❤️ para Monkey Food Badajoz