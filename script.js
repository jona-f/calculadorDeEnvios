// Formulario para calcular el envio

document.addEventListener('DOMContentLoaded', () => {
    const numPackagesSelect = document.getElementById('num-packages');
    const packageFieldsDiv = document.getElementById('package-fields');
    const packageFormsDiv = document.getElementById('package-forms');

    numPackagesSelect.addEventListener('change', togglePackageFields);

    function togglePackageFields() {
        const numPackages = parseInt(numPackagesSelect.value, 10);

        if (numPackages > 0) {
            packageFieldsDiv.classList.remove('hidden');
            generatePackageFields(numPackages);
        } else {
            packageFieldsDiv.classList.add('hidden');
            packageFormsDiv.innerHTML = '';
        }
    }

    function generatePackageFields(count) {
        packageFormsDiv.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            packageFormsDiv.innerHTML += `
                <div class="package-form">
                    <h4>Paquete ${i}</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="length${i}">Largo (cm):</label>
                            <input type="number" id="length${i}" name="length${i}">
                        </div>

                        <div class="form-group">
                            <label for="width${i}">Ancho (cm):</label>
                            <input type="number" id="width${i}" name="width${i}">
                        </div>

                        <div class="form-group">
                            <label for="height${i}">Altura (cm):</label>
                            <input type="number" id="height${i}" name="height${i}">
                        </div>

                        <div class="form-group">
                            <label for="weight${i}">Peso (kg):</label>
                            <input type="number" id="weight${i}" name="weight${i}">
                        </div>
                    </div>
                </div>
            `;
        }
    }

    window.calculateShipping = function() {
        const numPackages = parseInt(numPackagesSelect.value, 10);
        const deliveryTime = document.getElementById('delivery-time').value;

        const deliveryRates = {
            '24h': 6499,
            '72h': 4999,
            '5d': 3599,
        };

        const volumeLimit = 36750; // 36750 cm³
        const weightThreshold = 20; // 20 kg

        let totalVolume = 0;
        let totalWeight = 0;

        for (let i = 1; i <= numPackages; i++) {
            const length = parseFloat(document.getElementById(`length${i}`).value) || 0;
            const width = parseFloat(document.getElementById(`width${i}`).value) || 0;
            const height = parseFloat(document.getElementById(`height${i}`).value) || 0;
            const weight = parseFloat(document.getElementById(`weight${i}`).value) || 0;

            if (length <= 0 || width <= 0 || height <= 0 || weight <= 0 || length > 200 || width > 200 || height > 200) {
                document.getElementById('result').innerText = 'Por favor, ingrese valores válidos: mayores que cero y no mayores a 200 cm.';
                return;
            }

            // Calcular el volumen de cada paquete y sumarlo
            const volume = length * width * height;
            totalVolume += volume;

            // Sumar el peso total
            totalWeight += weight;
        }

        // Calcular el factor de volumen
        const volumeFactor = totalVolume / volumeLimit;

        // Determinar el factor de peso (solo si el peso total supera el umbral)
        const weightFactor = totalWeight > weightThreshold ? totalWeight / weightThreshold : 1;

        // Si el peso no supera el umbral, usar solo el factor de volumen
        const combinedFactor = totalWeight > weightThreshold ? (volumeFactor + weightFactor) : volumeFactor;

        // Obtener la tarifa base para el tiempo de entrega seleccionado
        const baseRate = deliveryRates[deliveryTime];

        // Calcular el costo total multiplicando el factor combinado por la tarifa base
        let totalCost = combinedFactor * baseRate;

        // Redondear el costo total a un decimal
        totalCost = Math.round(totalCost * 10) / 10;

        // Mostrar el resultado
        document.getElementById('result').innerText = `El costo total de envío es: $${totalCost.toFixed(1)}`;
    };
});





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