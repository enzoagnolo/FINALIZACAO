function calculateScore() {
    let totalScore = 0;

    // Array com as respostas corretas
    const answers = ["A", "B", "B", "C", "E"];
    
    // Calcula a pontuação total
    for (let i = 1; i <= 5; i++) {
        const selectedOption = document.querySelector(`input[name=q${i}]:checked`);
        if (selectedOption && selectedOption.value === answers[i - 1]) {
            totalScore += 5; // Adiciona 5 pontos se a resposta estiver correta
        }
    }

    // Exibe os resultados
    showResults(totalScore);
}

function showResults(score) {
    let result = "";
    if (score === 25) {
        result = "Você fez 25 pontos, você está no caminho certo!";
    } else if (score >= 15 && score <= 20) {
        result = "Você fez de 15 a 20 pontos, você precisa reforçar sua confiança em você mesmo!";
    } else if (score >= 0 && score <= 10) {
        result = "Você fez de 0 a 10 pontos, você precisa confiar mais em você mesmo, VOCÊ PODE! VOCÊ É CAPAZ! ACREDITE EM VOCÊ!";
    }
    document.getElementById('score').textContent = result;
}
