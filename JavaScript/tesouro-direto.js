document.getElementById('simulador-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxa = parseFloat(document.getElementById('taxa').value) / 100;

    const montanteFinal = valor * Math.pow(1 + taxa, prazo);

    document.getElementById('resultado').innerHTML = `
        <p>O montante final do investimento é: R$ ${montanteFinal.toFixed(2)}</p>
    `;
});