#!/usr/bin/env node
/**
 * Script de verificación de configuración de email
 * Ejecutar con: node verificar_email.js
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🔍 VERIFICANDO CONFIGURACIÓN DE EMAIL...');
console.log('=' .repeat(50));

// Verificar variables de entorno
console.log('📋 Variables de entorno:');
console.log(`EMAIL_HOST: ${process.env.EMAIL_HOST || '❌ NO CONFIGURADO'}`);
console.log(`EMAIL_PORT: ${process.env.EMAIL_PORT || '❌ NO CONFIGURADO'}`);
console.log(`EMAIL_USER: ${process.env.EMAIL_USER || '❌ NO CONFIGURADO'}`);
console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? '✅ CONFIGURADO' : '❌ NO CONFIGURADO'}`);
console.log(`CORPORATE_EMAIL: ${process.env.CORPORATE_EMAIL || '❌ NO CONFIGURADO'}`);
console.log('');

// Verificar si las credenciales son de ejemplo
if (process.env.EMAIL_USER && process.env.EMAIL_USER.includes('tu_email')) {
  console.log('⚠️  ADVERTENCIA: EMAIL_USER contiene valores de ejemplo');
  console.log('   Debes reemplazar "tu_email_real@gmail.com" por tu email real');
  console.log('');
}

if (process.env.EMAIL_PASS && process.env.EMAIL_PASS.includes('tu_contraseña')) {
  console.log('⚠️  ADVERTENCIA: EMAIL_PASS contiene valores de ejemplo');
  console.log('   Debes reemplazar por una contraseña de aplicación real');
  console.log('');
}

// Verificar configuración del transporter
try {
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  console.log('✅ Transporter de nodemailer creado correctamente');
  
  // Verificar conexión
  console.log('🔗 Verificando conexión SMTP...');
  
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ ERROR DE CONEXIÓN:');
      console.log(`   ${error.message}`);
      console.log('');
      
      // Diagnóstico específico
      if (error.message.includes('Invalid login')) {
        console.log('💡 SOLUCIÓN SUGERIDA:');
        console.log('   - Verifica que EMAIL_USER sea tu email real');
        console.log('   - Para Gmail: usa una contraseña de aplicación, NO tu contraseña normal');
        console.log('   - Activa la verificación en 2 pasos en tu cuenta de Google');
      } else if (error.message.includes('timeout')) {
        console.log('💡 SOLUCIÓN SUGERIDA:');
        console.log('   - Verifica tu conexión a internet');
        console.log('   - Comprueba que EMAIL_HOST y EMAIL_PORT sean correctos');
        console.log('   - Algunos firewalls bloquean puertos SMTP');
      } else if (error.message.includes('authentication')) {
        console.log('💡 SOLUCIÓN SUGERIDA:');
        console.log('   - Verifica las credenciales de email');
        console.log('   - Para Gmail: asegúrate de usar contraseña de aplicación');
        console.log('   - Algunos proveedores requieren configuración adicional');
      }
      
    } else {
      console.log('✅ CONEXIÓN SMTP EXITOSA');
      console.log('   El servidor de email está configurado correctamente');
      console.log('   Los correos deberían enviarse sin problemas');
    }
    
    console.log('');
    console.log('📖 Para más ayuda, consulta:');
    console.log('   - DIAGNOSTICO_EMAIL_ERROR.md');
    console.log('   - SOLUCION_PROBLEMAS_EMAIL.md');
  });
  
} catch (error) {
  console.log('❌ ERROR AL CREAR TRANSPORTER:');
  console.log(`   ${error.message}`);
  console.log('');
  console.log('💡 SOLUCIÓN:');
  console.log('   - Verifica que todas las variables de entorno estén configuradas');
  console.log('   - Asegúrate de que el archivo .env esté en la raíz del proyecto');
}

console.log('');
console.log('🔧 PASOS SIGUIENTES:');
console.log('1. Edita el archivo .env con tus credenciales reales');
console.log('2. Para Gmail: genera una contraseña de aplicación');
console.log('3. Ejecuta este script nuevamente: node verificar_email.js');
console.log('4. Si todo está bien, prueba el envío desde el panel admin');
console.log('');
console.log('=' .repeat(50));