// Formulario para calcular el envio
function calculateShipping() {
    // Obtener los valores del formulario
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const deliveryTime = document.getElementById('delivery-time').value;

    // Definir tarifas por tipo de envío
    const deliveryRates = {
        '24h': 4800,   // Tarifa por unidad de volumen para 24 horas
        '72h': 3600,   // Tarifa por unidad de volumen para 72 horas
        '5d': 3000     // Tarifa por unidad de volumen para 5 días
    };

    // Validar que los valores sean positivos y mayores que cero
    if (length <= 0 || width <= 0 || height <= 0 || weight <= 0) {
        document.getElementById('result').innerText = 'Por favor, ingrese valores válidos y mayores que cero.';
        return;
    }

    // Calcular el volumen del paquete
    const volume = length * width * height;

    // Definir límites
    const volumeLimit = 42000; // Volumen límite en cm³
    const weightThreshold = 20; // Peso límite en kg

    let cost;

    // Si el volumen supera 42,000 cm³ y el peso supera 20 kg
    if (volume > volumeLimit && weight > weightThreshold) {
        const volumeFactor = volume / volumeLimit;
        const weightFactor = weight / weightThreshold;
        cost = (volumeFactor + weightFactor) * deliveryRates[deliveryTime];
    }
    // Si solo el volumen supera 42,000 cm³
    else if (volume > volumeLimit) {
        const volumeFactor = volume / volumeLimit;
        cost = volumeFactor * deliveryRates[deliveryTime];
    }
    // Si solo el peso supera 20 kg
    else if (weight > weightThreshold) {
        const weightFactor = weight / weightThreshold;
        cost = weightFactor * deliveryRates[deliveryTime];
    }
    // Si ninguno de los límites se supera
    else {
        cost = deliveryRates[deliveryTime];
    }

    // Muestra el resultado
    document.getElementById('result').innerText = `El costo de envío es: $${cost.toFixed(2)}`;
}
