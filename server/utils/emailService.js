/**
 * Servicio para enviar correos electrónicos a los ganadores
 */

const nodemailer = require('nodemailer');

// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Enviar correo electrónico a un ganador
 * @param {Object} participant - Datos del participante
 * @param {Object} prize - Datos del premio
 * @returns {Promise} - Promesa con el resultado del envío
 */
exports.sendWinnerEmail = async (participant, prize) => {
  try {
    // Generar un código único para el premio
    const prizeCode = generatePrizeCode(participant.name, prize.name);

    // Configurar el correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: participant.email,
      subject: '¡Felicidades! Has ganado en la promoción de Monkey Food',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://monkeyfood.es/wp-content/uploads/2023/05/logo-monkey-food.png" alt="Monkey Food Logo" style="max-width: 200px;">
          </div>
          <h1 style="color: #FF6600; text-align: center;">¡Felicidades ${participant.name}!</h1>
          <p style="font-size: 16px; line-height: 1.5;">Has ganado un premio en nuestra promoción por la apertura de la nueva tienda en Badajoz:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <h2 style="color: #FF6600; margin-bottom: 10px;">${prize.name}</h2>
            <p style="font-size: 14px;">${prize.description}</p>
            <div style="background-color: #FF6600; color: white; padding: 10px; border-radius: 5px; font-size: 18px; font-weight: bold; margin-top: 15px;">
              Código: ${prizeCode}
            </div>
          </div>
          <p style="font-size: 16px; line-height: 1.5;">Para canjear tu premio, presenta este código en nuestra nueva tienda de Badajoz dentro del periodo de validez de la promoción.</p>
          <p style="font-size: 16px; line-height: 1.5;">¡Gracias por participar!</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #999; text-align: center;">
            <p>Este correo electrónico ha sido enviado por Monkey Food como parte de su promoción de apertura.</p>
            <p>Si tienes alguna pregunta, puedes contactarnos en ${process.env.CORPORATE_EMAIL}</p>
          </div>
        </div>
      `
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.messageId);
    return { success: true, prizeCode };
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Generar un código único para el premio
 * @param {string} name - Nombre del participante
 * @param {string} prizeName - Nombre del premio
 * @returns {string} - Código único para el premio
 */
function generatePrizeCode(name, prizeName) {
  const timestamp = Date.now().toString();
  const nameInitials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
  const prizeInitial = prizeName[0].toUpperCase();
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `MF-${prizeInitial}${nameInitials}-${randomNum}-${timestamp.slice(-4)}`;
}

/**
 * Enviar correo electrónico de prueba
 * @param {string} email - Email de destino
 * @returns {Promise} - Promesa con el resultado del envío
 */
exports.sendTestEmail = async (email) => {
  try {
    // Configurar el correo electrónico de prueba
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Test de correo electrónico - Monkey Food Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://monkeyfood.es/wp-content/uploads/2023/05/logo-monkey-food.png" alt="Monkey Food Logo" style="max-width: 200px;">
          </div>
          <h1 style="color: #FF6600; text-align: center;">Test de Correo Electrónico</h1>
          <p style="font-size: 16px; line-height: 1.5;">Este es un correo de prueba enviado desde el panel de administración de Monkey Food.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <h2 style="color: #FF6600; margin-bottom: 10px;">✅ Configuración de Email Correcta</h2>
            <p style="font-size: 14px;">El sistema de envío de correos electrónicos está funcionando correctamente.</p>
            <div style="background-color: #28a745; color: white; padding: 10px; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 15px;">
              Fecha y hora: ${new Date().toLocaleString('es-ES')}
            </div>
          </div>
          <p style="font-size: 16px; line-height: 1.5;">Si recibes este correo, significa que:</p>
          <ul style="font-size: 14px; line-height: 1.5;">
            <li>Las variables de entorno están configuradas correctamente</li>
            <li>La conexión SMTP está funcionando</li>
            <li>Los correos a ganadores se enviarán sin problemas</li>
          </ul>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #999; text-align: center;">
            <p>Este correo electrónico ha sido enviado desde el panel de administración de Monkey Food.</p>
            <p>Configuración: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}</p>
          </div>
        </div>
      `
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo de prueba enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar el correo de prueba:', error);
    return { success: false, error: error.message };
  }
};