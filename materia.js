document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("subject");
    const questionsContainer = document.getElementById("questions-container");

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = [];

    function showQuestion() {
        const question = questions[subject][currentQuestionIndex];

        questionsContainer.innerHTML = `
            <h2>${question.question}</h2>
            ${question.options.map((option, index) => `
                <button class="option" onclick="checkAnswer(${index})">${option}</button>
            `).join('')}
        `;
    }

    window.checkAnswer = function(selectedOption) {
        const question = questions[subject][currentQuestionIndex];
        if (selectedOption === question.correct) {
            correctAnswers++;
        } else {
            incorrectAnswers.push({
                question: question.question,
                selected: question.options[selectedOption],
                correct: question.options[question.correct]
            });
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions[subject].length) {
            showQuestion();
        } else {
            showResults();
        }
    };

    function showResults() {
        questionsContainer.innerHTML = `
            <h2>Resultado</h2>
            <p>Você acertou ${correctAnswers} de ${questions[subject].length} perguntas.</p>
            ${incorrectAnswers.length > 0 ? '<h3>Erros:</h3>' : ''}
            ${incorrectAnswers.map(incorrect => `
                <div class="result-item">
                    <p><strong>Pergunta:</strong> ${incorrect.question}</p>
                    <p><strong>Resposta Selecionada:</strong> ${incorrect.selected}</p>
                    <p><strong>Resposta Correta:</strong> ${incorrect.correct}</p>
                </div>
            `).join('')}
            <button onclick="window.location.href = 'index.html';">Voltar ao Início</button>
        `;
    }

    showQuestion();
});
