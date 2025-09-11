const Participant = require('../models/Participant');
const { getRandomPrize } = require('./prizeController');
const { sendWinnerEmail, sendTestEmail } = require('../utils/emailService');

// SVG Logo inline para emails corporativos
const MONKEY_FOOD_LOGO_SVG = `<svg width="200" height="155" viewBox="0 0 1144.65 889.2" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .cls-1 {
        fill: #f7ba26;
      }
    </style>
  </defs>
  <g>
    <polygon class="cls-1" points="133 575.03 144.64 575.03 144.64 726.35 112.31 726.35 112.31 644.66 74.37 692.08 70.27 692.08 32.34 644.66 32.34 726.35 0 726.35 0 575.03 11.86 575.03 72.43 646.81 133 575.03"/>
    <path class="cls-1" d="M295.71,698.98c23.49,0,44.83-15.09,44.83-48.07s-21.12-47.86-44.61-47.86-44.84,15.96-44.84,47.86,20.49,48.07,44.63,48.07M295.28,728.51c-40.31,0-76.74-26.74-76.74-77.61s37.29-77.6,77.39-77.6,76.74,26.94,76.74,77.6c0,45.92-31.69,77.61-77.39,77.61"/>
    <polygon class="cls-1" points="478.68 640.13 478.68 726.35 446.56 726.35 446.56 574.81 456.69 574.81 541.4 661.04 541.4 575.46 573.74 575.46 573.74 726.79 564.04 726.79 478.68 640.13"/>
    <path class="cls-1" d="M688.17,637.76c9.26,0,20.04.22,26.08-2.79,7.97-4.32,10.99-15.74,15.08-32.77,5.18-18.75,18.33-33.41,51.52-26.51v21.98c-12.07-1.07-18.54,2.59-21.77,14.02-4.53,17.25-9.7,30.82-18.97,40.1l46.13,69.84v4.74h-36.43l-37.94-62.09c-5.82,1.52-17.02,1.52-23.7,1.52v60.57h-32.12v-150.9h32.12v62.3Z"/>
    <polygon class="cls-1" points="947.44 603.7 887.52 603.7 887.52 634.31 943.57 634.31 943.57 662.55 887.52 662.55 887.52 697.04 949.17 697.04 949.17 726.35 854.97 726.35 854.97 575.46 947.44 575.46 947.44 603.7"/>
    <polygon class="cls-1" points="1077.39 636.46 1092.27 606.5 1110.37 575.46 1144.65 575.46 1144.65 580.2 1092.91 665.99 1092.91 726.36 1060.57 726.36 1060.57 665.99 1008.63 580.2 1008.63 575.46 1043.34 575.46 1062.09 607.58 1076.32 636.46 1077.39 636.46"/>
    <polygon class="cls-1" points="369.21 849.53 329.42 849.53 329.42 888.02 318.46 888.02 318.46 796.7 372.73 796.7 372.73 806.35 329.42 806.35 329.42 839.88 369.21 839.88 369.21 849.53"/>
    <path class="cls-1" d="M482.92,879.15c20.08,0,35.48-14.62,35.48-36.79s-15.13-36.92-35.36-36.92-35.35,14.48-35.35,36.92,15.26,36.79,35.23,36.79M482.92,889.2c-25.7,0-46.18-17.74-46.18-46.83s20.74-46.84,46.31-46.84,46.31,17.88,46.31,46.84-18.91,46.83-46.44,46.83"/>
    <path class="cls-1" d="M640.71,879.15c20.08,0,35.48-14.62,35.48-36.79s-15.14-36.92-35.36-36.92-35.35,14.48-35.35,36.92,15.26,36.79,35.23,36.79M640.71,889.2c-25.7,0-46.18-17.74-46.18-46.83s20.74-46.84,46.31-46.84,46.31,17.88,46.31,46.84-18.91,46.83-46.44,46.83"/>
    <path class="cls-1" d="M790.01,878.11c20.87,0,33.79-15.27,33.79-35.75s-12.92-35.61-33.79-35.61h-21.13v71.36h21.13ZM790.27,796.7c27.92,0,44.35,20.49,44.35,45.53s-16.44,45.78-44.35,45.78h-32.36v-91.32h32.36Z"/>
    <path class="cls-1" d="M685.23,290.5c.05-60.24-17.19-152.89-26.44-202.66-1.58-8.48-2.9-15.59-3.83-20.91-.16-.92-.52-1.68-1.12-2.39-1.89-2.2-6.68-6.56-14.29-5.37-8.32,1.3-11.06,7.4-11.87,10.05-.23.76-.26,1.48-.13,2.25.94,5.43,2.3,12.72,3.93,21.45,6.16,33.11,15.9,85.54,21.54,133.85-17.77-11.2-43.68-16.89-79.47-11.62-32.32,4.76-56.31,14.82-71.85,29.8-7.5-64.13-12.08-145.71-8.84-216.71,0,0-2.79-10.32-13.62-10.32-8.29,0-12.18,5.31-13.55,7.8-.4.72-.61,1.47-.64,2.29-3.86,87.11,3.84,206.16,18.38,283.54h.02c.03.13.04.25.06.37,11.34,52.41,40.49,81.14,52.49,91.07,18.42,15.21,72.99,22.21,92.18,2.09,19.45-20.38,24.17-82.92,24.91-95.26,1.23-20.16-3.87-35.84-15.15-46.59-13.3-12.69-33.66-17.35-62.03-14.3-28.93,3.12-42.62,14.92-49.01,24.26-7.58,11.08-9.48,24.7-5.51,39.42,5.96,22.02,14.96,55.3,41.02,61.81,10.36,2.59,26.02,6.5,38.84-1.5,7.94-4.96,13.25-13.52,15.8-25.44,6.28-29.53,5.31-45.77-3.37-56.03-8.47-10.04-21.09-9.51-25.25-9.34-9.37.39-19.78,1.94-26,10.45-6.62,9.04-3.63,20-2.65,23.59,1.84,6.74,9.49,17.28,13.19,19.4,0,0,6.13,2.09,7.96,1.26,2.55-1.14,3.89-7.61,3.89-7.61-2.2-4.9-5.4-15.24-4.06-19.11.75-.06,7.8-.18,8.82-.22,1.54-.06,2.44,0,3.03.06.66,2.19,1.9,9.92-2.74,31.76-1.02,4.74-2.43,7.09-3.34,7.66-2.79,1.75-13.02-.8-17.38-1.89-10.25-2.56-17.74-30.28-20.95-42.11-1.81-6.71-1.26-12.25,1.63-16.48,4.37-6.4,14.69-10.77,29.05-12.32,19.28-2.08,33.04.26,39.86,6.77,5.08,4.85,7.3,13.2,6.6,24.81-2.13,35.12-9.88,70-17.28,77.75-5.88,6.15-43.73,4.46-54.39-4.33-9.76-8.06-33.45-31.53-42.98-75.29-.04-.2-.07-.42-.11-.62-2.97-14.13-1.35-25.49,5.03-34.7,9.68-13.97,31.11-23.76,61.95-28.31,43.38-6.39,72.68,5.86,78.3,32.79.76,3.63,1.25,8.08,1.53,13.07,0,.64.04,1.34.04,1.98h.07c1.7,39.41-9.54,110.99-20.59,120.71-15.52,13.65-79.94,25.89-118.01-1.33-47.23-33.75-53.66-87.35-53.72-87.89,0,0-3.78-9.46-15.05-7.8-10.51,1.55-12.59,10.71-12.59,10.71.28,2.69,7.51,66.36,65.2,107.58,21.55,15.4,48.8,21.31,74.66,21.31,33.29,0,64.29-9.79,77.86-21.71,21.88-19.23,31.1-98.16,29.78-141.56h.17Z"/>
    <path class="cls-1" d="M535.39,206.91c.55,3.03,3.55,4.88,6.48,3.95,2.04-.64,4.66-1.33,7.87-1.92,3.12-.57,6.03-.91,8.37-1.11,3.01-.26,5.15-2.97,4.61-5.95-2.31-12.85-7.76-45.62-9.59-77.86-4.31-76.3-5.32-108.86-5.51-116.23-.04-1.36-.56-2.6-1.57-3.52-1.96-1.8-6.1-4.28-14.07-4.28-6.22,0-9.52,2.85-11.06,4.81-.75.95-1.12,2.07-1.1,3.27.17,6.94,1.11,38.82,5.56,117.51,1.94,34.14,7.56,67.86,10,81.31"/>
    <path class="cls-1" d="M614.51,196.05c-5.61-107.76-10.7-169.24-11.54-179.12-.09-1.05-.46-2.02-1.16-2.81-1.79-1.97-6.07-5.24-14.36-4.32-6.11.68-9.55,4.11-11.15,6.31-.75,1.02-1.11,2.19-1,3.45.88,10.35,5.9,71.21,11.45,177.71.16,3.05,2.91,5.33,5.93,4.85,2.31-.36,5.2-.69,8.41-.75,3.35-.06,6.09-.01,8.2.08,2.99.13,5.37-2.42,5.21-5.41"/>
  </g>
</svg>`;
const nodemailer = require('nodemailer');

// Registrar un nuevo participante
exports.registerParticipant = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const deviceId = req.deviceId;

    // La verificación de participación previa ya se realiza en el middleware

    // Obtener un premio aleatorio
    const prize = await getRandomPrize();

    // Determinar si el participante ha ganado
    const hasWon = prize.name !== 'NO PREMIADO';

    // Crear el nuevo participante
    const participant = await Participant.create({
      name,
      email,
      phone,
      deviceId,
      prize: prize._id,
      hasWon
    });

    // Si el participante ha ganado, enviar correos electrónicos
    if (hasWon) {
      // Enviar correo al ganador
      const emailResult = await sendWinnerEmail(participant, prize);
      
      // Enviar notificación a la empresa
      await notifyCorporateEmail(participant, prize);
      
      // Guardar el código del premio si se generó correctamente
      if (emailResult && emailResult.success && emailResult.prizeCode) {
        participant.prizeCode = emailResult.prizeCode;
        await participant.save();
      }
    }

    res.status(201).json({
      success: true,
      data: {
        participant,
        prize
      }
    });
  } catch (error) {
    console.error('Error al registrar participante:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Enviar correo electrónico a la empresa cuando alguien gana un premio
const notifyCorporateEmail = async (participant, prize) => {
  try {
    // Configurar el transporte de correo electrónico para notificación interna
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: `"Monkey Food - Dpto Marketing" <${process.env.EMAIL_USER}>`,
      to: process.env.CORPORATE_EMAIL,
      subject: `¡Nuevo ganador en la promoción de Badajoz! - ${prize.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              ${MONKEY_FOOD_LOGO_SVG}
            </div>
            <h1 style="color: #f7ba26; text-align: center;">¡Nuevo ganador en la promoción de Badajoz!</h1>
            <p><strong>Nombre:</strong> ${participant.name}</p>
            <p><strong>Email:</strong> ${participant.email}</p>
            <p><strong>Teléfono:</strong> ${participant.phone}</p>
            <p><strong>Premio:</strong> ${prize.name}</p>
            <p><strong>Descripción:</strong> ${prize.description}</p>
            <p><strong>Fecha:</strong> ${new Date(participant.createdAt).toLocaleString('es-ES')}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${process.env.CORPORATE_EMAIL} para el ganador ${participant.name}`);
  } catch (error) {
    console.error('Error al enviar correo electrónico a la empresa:', error);
  }
};

// Obtener todos los participantes
exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate('prize');
    res.status(200).json({
      success: true,
      count: participants.length,
      participants: participants
    });
  } catch (error) {
    console.error('Error al obtener participantes:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al obtener participantes'
    });
  }
};

// Obtener un participante por ID
exports.getParticipant = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id).populate('prize');

    if (!participant) {
      return res.status(404).json({
        success: false,
        error: 'Participante no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: participant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Verificar si un dispositivo ya ha participado
exports.checkDevice = async (req, res) => {
  try {
    // Usar el deviceId de los parámetros o del middleware
    const deviceId = req.params.deviceId || req.deviceId;
    const participant = await Participant.findOne({ deviceId });

    res.status(200).json({
      success: true,
      hasParticipated: !!participant,
      data: participant ? {
        name: participant.name,
        hasWon: participant.hasWon
      } : null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Obtener estadísticas de participación
exports.getStats = async (req, res) => {
  try {
    const totalParticipants = await Participant.countDocuments();
    const winners = await Participant.countDocuments({ hasWon: true });
    const nonWinners = await Participant.countDocuments({ hasWon: false });

    res.status(200).json({
      success: true,
      data: {
        totalParticipants,
        winners,
        nonWinners,
        winRate: totalParticipants > 0 ? (winners / totalParticipants) * 100 : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Enviar correo de prueba
exports.sendTestEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email es requerido'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Formato de email inválido'
      });
    }

    const result = await sendTestEmail(email);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Correo de prueba enviado correctamente',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Error al enviar correo de prueba'
      });
    }
  } catch (error) {
    console.error('Error en sendTestEmail:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Exportar participantes a CSV
exports.exportParticipants = async (req, res) => {
  try {
    const participants = await Participant.find({}).sort({ createdAt: -1 });
    
    // Crear contenido CSV
    const csvHeader = 'Nombre,Email,Teléfono,Premio,Ha Ganado,Código de Premio,Fecha de Registro\n';
    const csvContent = participants.map(participant => {
      const name = `"${(participant.name || '').replace(/"/g, '""')}"`;
      const email = `"${(participant.email || '').replace(/"/g, '""')}"`;
      const phone = `"${(participant.phone || 'No proporcionado').replace(/"/g, '""')}"`;
      const prize = `"${(participant.prize || 'Sin premio').replace(/"/g, '""')}"`;
      const hasWon = participant.hasWon ? 'Sí' : 'No';
      const prizeCode = `"${(participant.prizeCode || 'N/A').replace(/"/g, '""')}"`;
      const createdAt = participant.createdAt ? new Date(participant.createdAt).toLocaleString('es-ES') : 'N/A';
      
      return `${name},${email},${phone},${prize},${hasWon},${prizeCode},${createdAt}`;
    }).join('\n');
    
    const csv = csvHeader + csvContent;
    
    // Configurar headers para descarga
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="participantes_${new Date().toISOString().split('T')[0]}.csv"`);
    res.setHeader('Content-Length', Buffer.byteLength(csv, 'utf8'));
    
    // Enviar CSV
    res.status(200).send(csv);
  } catch (error) {
    console.error('Error al exportar participantes:', error);
    res.status(500).json({
      success: false,
      error: 'Error al exportar participantes'
    });
  }
};