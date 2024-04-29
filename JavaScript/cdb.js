function calcularCDB() {
    var principal = parseFloat(document.getElementById('principal').value);
    var taxaAnual = parseFloat(document.getElementById('taxa').value);
    var periodoAnos = parseFloat(document.getElementById('periodo').value);

    var taxaMensal = taxaAnual / 100 / 12;
    var numeroDeParcelas = periodoAnos * 12;

    var montante = principal * Math.pow(1 + taxaMensal, numeroDeParcelas);

    var resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = `O montante ao final do período de ${periodoAnos} meses será de R$ ` + montante.toFixed(2);
}
