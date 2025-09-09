const Participant = require('../models/Participant');
const { getRandomPrize } = require('./prizeController');
const { sendWinnerEmail } = require('../utils/emailService');
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
      from: process.env.EMAIL_USER,
      to: process.env.CORPORATE_EMAIL,
      subject: `¡Nuevo ganador en la promoción de Badajoz! - ${prize.name}`,
      html: `
        <h1>¡Nuevo ganador en la promoción de Badajoz!</h1>
        <p><strong>Nombre:</strong> ${participant.name}</p>
        <p><strong>Email:</strong> ${participant.email}</p>
        <p><strong>Teléfono:</strong> ${participant.phone}</p>
        <p><strong>Premio:</strong> ${prize.name}</p>
        <p><strong>Descripción:</strong> ${prize.description}</p>
        <p><strong>Fecha:</strong> ${new Date(participant.createdAt).toLocaleString('es-ES')}</p>
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
      data: participants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
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