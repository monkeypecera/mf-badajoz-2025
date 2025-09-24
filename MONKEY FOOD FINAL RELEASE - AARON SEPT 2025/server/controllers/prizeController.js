const Prize = require('../models/Prize');

// Inicializar los premios en la base de datos
exports.initializePrizes = async () => {
  try {
    // Verificar si ya existen premios
    const existingPrizes = await Prize.countDocuments();
    if (existingPrizes > 0) {
      console.log('Los premios ya están inicializados');
      return;
    }

    // Total 5000 prizes: 4000 non-winners, 1000 winners
    const prizes = [
      {
        name: 'NO PREMIADO',
        description: 'Sin premio',
        quantity: 4000,
        initialQuantity: 4000,
        probability: 0.8,
        isActive: true
      },
      {
        name: 'HAMBURGUESA CLASICA GRATIS',
        description: 'Una hamburguesa gratis',
        quantity: 50,
        initialQuantity: 50,
        probability: 0.01,
        isActive: true
      },
      {
        name: 'PATATAS GRATIS',
        description: 'Unas patatas fritas gratis',
        quantity: 50,
        initialQuantity: 50,
        probability: 0.01,
        isActive: true
      },
      {
        name: '5% DESCUENTO',
        description: '5% de descuento en tu próxima compra*',
        quantity: 500,
        initialQuantity: 500,
        probability: 0.10,
        isActive: true
      },
      {
        name: '10% DESCUENTO',
        description: '10% de descuento en tu próxima compra*',
        quantity: 300,
        initialQuantity: 300,
        probability: 0.06,
        isActive: true
      },
      {
        name: '20% DESCUENTO',
        description: '20% de descuento en tu próxima compra*',
        quantity: 100,
        initialQuantity: 100,
        probability: 0.02,
        isActive: true
      }
    ];

    // Insertar los premios en la base de datos
    await Prize.insertMany(prizes);
    console.log('Premios inicializados correctamente');
  } catch (error) {
    console.error('Error al inicializar los premios:', error);
  }
};

// Obtener todos los premios
exports.getPrizes = async (req, res) => {
  try {
    const prizes = await Prize.find();
    res.status(200).json({
      success: true,
      count: prizes.length,
      data: prizes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Obtener un premio aleatorio basado en las probabilidades y disponibilidad
exports.getRandomPrize = async () => {
  try {
    // Obtener todos los premios activos con cantidad disponible
    const availablePrizes = await Prize.find({
      isActive: true,
      quantity: { $gt: 0 }
    });

    // Obtener el premio "NO PREMIADO" para casos de fallback
    const noPrize = await Prize.findOne({ name: 'NO PREMIADO' });

    // Si no hay premios disponibles excepto "NO PREMIADO", devolver "NO PREMIADO"
    if (availablePrizes.length === 0 || (availablePrizes.length === 1 && availablePrizes[0].name === 'NO PREMIADO')) {
      return noPrize;
    }

    // Calcular la suma total de probabilidades ajustadas
    // Ajustamos las probabilidades según la cantidad disponible relativa a la cantidad inicial
    const prizesWithAdjustedProbability = availablePrizes.map(prize => {
      // Calcular el ratio de disponibilidad (cantidad actual / cantidad inicial)
      const availabilityRatio = prize.quantity / prize.initialQuantity;
      
      // Ajustar la probabilidad según la disponibilidad
      // Si el premio es "NO PREMIADO", no ajustamos su probabilidad
      const adjustedProbability = prize.name === 'NO PREMIADO' 
        ? prize.probability 
        : prize.probability * availabilityRatio;
      
      return {
        ...prize.toObject(),
        adjustedProbability
      };
    });

    // Calcular la suma total de probabilidades ajustadas
    const totalAdjustedProbability = prizesWithAdjustedProbability.reduce(
      (sum, prize) => sum + prize.adjustedProbability,
      0
    );

    // Generar un número aleatorio entre 0 y la suma total de probabilidades ajustadas
    const randomValue = Math.random() * totalAdjustedProbability;

    // Seleccionar un premio basado en el valor aleatorio
    let accumulatedProbability = 0;
    for (const prize of prizesWithAdjustedProbability) {
      accumulatedProbability += prize.adjustedProbability;
      if (randomValue <= accumulatedProbability) {
        // Obtener el premio original de la base de datos
        const selectedPrize = await Prize.findById(prize._id);
        
        // Verificar que aún hay cantidad disponible (podría haber cambiado desde la consulta inicial)
        if (selectedPrize.quantity <= 0) {
          console.log(`Premio ${selectedPrize.name} agotado, seleccionando otro...`);
          // Si el premio se agotó, intentar de nuevo
          return exports.getRandomPrize();
        }
        
        // Decrementar la cantidad disponible del premio seleccionado
        selectedPrize.quantity -= 1;
        await selectedPrize.save();
        
        console.log(`Premio seleccionado: ${selectedPrize.name}, quedan: ${selectedPrize.quantity}`);
        return selectedPrize;
      }
    }

    // Si por alguna razón no se seleccionó ningún premio, devolver el premio "NO PREMIADO"
    return noPrize;
  } catch (error) {
    console.error('Error al obtener un premio aleatorio:', error);
    // En caso de error, devolver el premio "NO PREMIADO"
    const noPrize = await Prize.findOne({ name: 'NO PREMIADO' });
    return noPrize || { name: 'NO PREMIADO', description: 'Sin premio' };
  }
};

// Actualizar un premio
exports.updatePrize = async (req, res) => {
  try {
    const prize = await Prize.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!prize) {
      return res.status(404).json({
        success: false,
        error: 'Premio no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: prize
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Restablecer todos los premios a sus cantidades iniciales
exports.resetPrizes = async (req, res) => {
  try {
    const prizes = await Prize.find();

    for (const prize of prizes) {
      prize.quantity = prize.initialQuantity;
      await prize.save();
    }

    res.status(200).json({
      success: true,
      message: 'Todos los premios han sido restablecidos'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Obtener estadísticas detalladas de la distribución de premios
exports.getPrizeStats = async (req, res) => {
  try {
    const prizes = await Prize.find();
    
    // Calcular estadísticas para cada premio
    const prizeStats = prizes.map(prize => {
      const remaining = prize.quantity;
      const distributed = prize.initialQuantity - prize.quantity;
      const distributionPercentage = prize.initialQuantity > 0 
        ? (distributed / prize.initialQuantity * 100).toFixed(2) 
        : 0;
      
      return {
        name: prize.name,
        initialQuantity: prize.initialQuantity,
        remaining,
        distributed,
        distributionPercentage: `${distributionPercentage}%`,
        probability: `${(prize.probability * 100).toFixed(2)}%`,
        isActive: prize.isActive
      };
    });
    
    // Calcular estadísticas globales
    const totalInitial = prizes.reduce((sum, prize) => sum + prize.initialQuantity, 0);
    const totalRemaining = prizes.reduce((sum, prize) => sum + prize.quantity, 0);
    const totalDistributed = totalInitial - totalRemaining;
    const globalDistributionPercentage = totalInitial > 0 
      ? (totalDistributed / totalInitial * 100).toFixed(2) 
      : 0;
    
    res.status(200).json({
      success: true,
      data: {
        prizes: prizeStats,
        summary: {
          totalInitial,
          totalRemaining,
          totalDistributed,
          globalDistributionPercentage: `${globalDistributionPercentage}%`
        }
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas de premios:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};