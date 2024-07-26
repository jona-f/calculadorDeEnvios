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
        '24h': 4799,   // Tarifa por unidad de volumen para 24 horas
        '72h': 3599,   // Tarifa por unidad de volumen para 72 horas
        '5d': 2999     // Tarifa por unidad de volumen para 5 días
    };

    // Validar que los valores sean positivos, mayores que cero y no pasen de 200 cm
    if (length <= 0 || width <= 0 || height <= 0 || weight <= 0 || length > 200 || width > 200 || height > 200) {
        document.getElementById('result').innerText = 'Por favor, ingrese valores válidos: mayores que cero y no mayores a 200 cm.';
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

// texto que se borra 

// function([string1, string2],target id,[color1,color2])    
consoleText(['CL Logistica', 'Tu Logistica de confianza','Rapida y Segura'], 'text', ['lightblue', 'black', 'lightblue']);

function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function () {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function () {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0])
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
        }
    }, 120)
    window.setInterval(function () {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;

        } else {
            con.className = 'console-underscore'

            visible = true;
        }
    }, 400)
}