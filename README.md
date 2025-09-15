# 🐒 Monkey Food Competition

## Descripción

Sistema de concurso interactivo para Monkey Food con gestión de premios, participantes y notificaciones por email. Incluye panel de administración completo y sistema anti-fraude.

## ✨ Características Principales

- 🎯 **Sistema de Concurso**: Participación con validación de datos
- 🏆 **Gestión de Premios**: Sistema dinámico de premios con probabilidades
- 🛡️ **Anti-Fraude**: Identificación única por dispositivo
- 📧 **Notificaciones Email**: Envío automático a ganadores
- 👨‍💼 **Panel Admin**: Gestión completa de participantes y premios
- 📊 **Estadísticas**: Visualización de datos en tiempo real
- 🔒 **Seguridad**: Validación, sanitización y protección CSRF
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🖼️ **Iframe Ready**: Configurado para embedding en WordPress

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js 16+ 
- MongoDB Atlas (cuenta gratuita)
- Cuenta de email (Gmail recomendado)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/monkey-food-competition.git
cd monkey-food-competition
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia `.env.example` a `.env` y configura:

```env
# MongoDB
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/monkeyfood

# Email (Gmail)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-password-seguro

# Servidor
PORT=3000
NODE_ENV=production
```

### 4. Inicializar base de datos
```bash
node database/init.js
```

### 5. Ejecutar la aplicación
```bash
npm start
```

## 📁 Estructura del Proyecto

```
monkey-food-competition/
├── 📁 database/           # Configuración y scripts de BD
│   ├── db.js             # Conexión MongoDB
│   ├── init.js           # Inicialización de premios
│   └── maintenance.js    # Mantenimiento BD
├── 📁 public/            # Archivos estáticos
│   ├── admin.html        # Panel de administración
│   ├── index.html        # Página principal
│   ├── 📁 css/          # Estilos
│   ├── 📁 js/           # JavaScript frontend
│   └── 📁 images/       # Imágenes y assets
├── 📁 server/            # Backend Node.js
│   ├── 📁 controllers/  # Lógica de negocio
│   ├── 📁 middleware/   # Middleware personalizado
│   ├── 📁 models/       # Modelos MongoDB
│   ├── 📁 routes/       # Rutas API
│   └── 📁 utils/        # Utilidades
├── .env.example          # Plantilla variables entorno
├── package.json          # Dependencias npm
└── deploy.sh            # Script de despliegue
```

## 🔧 Configuración Detallada

### MongoDB Atlas
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear cluster gratuito
3. Configurar usuario y obtener URI de conexión
4. Añadir IP 0.0.0.0/0 para acceso desde cualquier lugar

### Email con Gmail
1. Activar autenticación de 2 factores
2. Generar contraseña de aplicación
3. Usar la contraseña de aplicación en `EMAIL_PASS`

### Panel de Administración
- URL: `/admin.html`
- Credenciales: Configuradas en `.env`
- Funciones: Gestión premios, participantes, estadísticas

## 🌐 Despliegue

### Render (Recomendado)
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Desplegar automáticamente

### Otras plataformas
- Heroku
- Vercel
- Railway
- DigitalOcean

## 🖼️ Embedding en WordPress

El proyecto está configurado para funcionar en iframes:

```html
<iframe src="https://tu-app.onrender.com" 
        width="100%" 
        height="600" 
        frameborder="0" 
        allowfullscreen>
</iframe>
```

## 📊 API Endpoints

### Participantes
- `POST /api/participants` - Crear participante
- `GET /api/participants` - Listar participantes (admin)

### Premios
- `GET /api/prizes` - Obtener premios disponibles
- `POST /api/prizes/assign` - Asignar premio
- `PUT /api/prizes/reset` - Reiniciar premios (admin)

### Admin
- `POST /api/admin/login` - Login administrador
- `GET /api/admin/stats` - Estadísticas
- `POST /api/admin/test-email` - Probar email

## 🛠️ Desarrollo

### Ejecutar en modo desarrollo
```bash
npm run dev
```

### Estructura de archivos importantes
- `server/index.js` - Servidor principal
- `public/js/main.js` - Lógica frontend principal
- `public/js/admin.js` - Panel administración
- `server/utils/emailService.js` - Servicio de email

## 🔒 Seguridad

- ✅ Validación y sanitización de datos
- ✅ Protección CSRF
- ✅ Rate limiting
- ✅ Headers de seguridad
- ✅ Prevención SQL injection
- ✅ Sistema anti-fraude por dispositivo

## 🐛 Solución de Problemas

### Error de conexión MongoDB
```bash
# Verificar URI de conexión
node -e "console.log(process.env.MONGODB_URI)"
```

### Error de email
```bash
# Probar configuración email
node server/utils/emailService.js
```

### Puerto en uso
```bash
# Cambiar puerto en .env
PORT=3001
```

## 📝 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📞 Soporte

- 📧 Email: soporte@monkeyfood.es
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/monkey-food-competition/issues)
- 📖 Documentación: Ver archivos `INSTALLATION_GUIDE.md` y `USER_GUIDE.md`

---

**Desarrollado con ❤️ para Monkey Food**