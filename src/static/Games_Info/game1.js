// Quick Math Quiz Game Logic

class QuickMathQuiz {
    constructor() {
        this.score = 0;
        this.currentQuestion = null;
        this.timer = null;
        this.timeLeft = 10;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.gameActive = false;
        this.questionStartTime = null;

        // DOM elements
        this.questionElement = document.getElementById('question');
        this.answerInput = document.getElementById('answer');
        this.submitBtn = document.getElementById('submit-btn');
        this.feedbackElement = document.getElementById('feedback');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.progressElement = document.getElementById('progress');
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.statsElement = document.getElementById('stats');
        this.finalScoreElement = document.getElementById('final-score');
        this.questionsAnsweredElement = document.getElementById('questions-answered');
        this.correctAnswersElement = document.getElementById('correct-answers');
        this.accuracyElement = document.getElementById('accuracy');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showStartScreen();
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.submitBtn.addEventListener('click', () => this.checkAnswer());
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
    }

    startGame() {
        this.resetGame();
        this.gameActive = true;
        this.showGameScreen();
        this.generateQuestion();
        this.startTimer();
    }

    resetGame() {
        this.score = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.updateScore();
        this.clearFeedback();
    }

    showStartScreen() {
        this.questionElement.textContent = 'Ready to test your math skills?';
        this.answerInput.style.display = 'none';
        this.submitBtn.style.display = 'none';
        this.startBtn.style.display = 'block';
        this.nextBtn.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.statsElement.style.display = 'none';
        this.progressElement.style.width = '0%';
    }

    showGameScreen() {
        this.answerInput.style.display = 'block';
        this.submitBtn.style.display = 'block';
        this.startBtn.style.display = 'none';
        this.statsElement.style.display = 'none';
        this.answerInput.value = '';
        this.answerInput.focus();
    }

    generateQuestion() {
        // Generate random math problems (addition, subtraction, multiplication)
        const operations = ['+', '-', '*'];
        const operation = operations[Math.floor(Math.random() * operations.length)];

        let num1, num2, answer;

        switch (operation) {
            case '+':
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * 50) + 1;
                answer = num1 + num2;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 100) + 10;
                num2 = Math.floor(Math.random() * num1) + 1;
                answer = num1 - num2;
                break;
            case '*':
                num1 = Math.floor(Math.random() * 12) + 1;
                num2 = Math.floor(Math.random() * 12) + 1;
                answer = num1 * num2;
                break;
        }

        this.currentQuestion = {
            num1,
            num2,
            operation,
            answer
        };

        this.questionElement.textContent = `${num1} ${operation} ${num2} = ?`;
        this.questionStartTime = Date.now();
        this.clearFeedback();
    }

    startTimer() {
        this.timeLeft = 10;
        this.updateTimer();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();

            if (this.timeLeft <= 3) {
                this.timerElement.parentElement.classList.add('timer-warning');
            }

            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    updateTimer() {
        this.timerElement.textContent = this.timeLeft;
    }

    checkAnswer() {
        if (!this.gameActive) return;

        const userAnswer = parseInt(this.answerInput.value);
        if (isNaN(userAnswer)) {
            this.showFeedback('Please enter a valid number!', 'incorrect');
            return;
        }

        clearInterval(this.timer);
        this.timerElement.parentElement.classList.remove('timer-warning');

        const timeTaken = (Date.now() - this.questionStartTime) / 1000;
        this.questionsAnswered++;

        if (userAnswer === this.currentQuestion.answer) {
            this.correctAnswers++;
            let points = 10;

            // Bonus for quick answers (under 5 seconds)
            if (timeTaken < 5) {
                points += 20;
                this.showFeedback(`Correct! +${points} points (Bonus!)`, 'bonus');
            } else {
                this.showFeedback(`Correct! +${points} points`, 'correct');
            }

            this.score += points;
        } else {
            this.score -= 5;
            this.showFeedback(`Incorrect! -5 points. Answer: ${this.currentQuestion.answer}`, 'incorrect');
        }

        this.updateScore();
        this.updateProgress();
        this.gameActive = false;
        this.submitBtn.disabled = true;

        // Hide submit button and answer input to prevent multiple submits
        this.submitBtn.style.display = 'none';
        this.answerInput.style.display = 'none';

        // Show next button after a delay
        setTimeout(() => {
            this.nextBtn.style.display = 'block';
        }, 2000);
    }

    timeUp() {
        clearInterval(this.timer);
        this.timerElement.parentElement.classList.remove('timer-warning');
        this.questionsAnswered++;
        this.score -= 5;
        this.showFeedback(`Time's up! -5 points. Answer: ${this.currentQuestion.answer}`, 'incorrect');
        this.updateScore();
        this.updateProgress();
        this.gameActive = false;
        this.submitBtn.disabled = true;

        setTimeout(() => {
            this.nextBtn.style.display = 'block';
        }, 2000);
    }

    nextQuestion() {
        if (this.questionsAnswered >= 10) {
            this.showStats();
        } else {
            // Reset game state for new question
            this.gameActive = true;
            this.showGameScreen();
            this.generateQuestion();
            this.startTimer();
            this.nextBtn.style.display = 'none';

            // Ensure submit button is properly enabled and visible
            this.submitBtn.disabled = false;
            this.submitBtn.style.display = 'block';
            this.answerInput.style.display = 'block';
        }
    }

    showStats() {
        this.statsElement.style.display = 'block';
        this.finalScoreElement.textContent = this.score;
        this.questionsAnsweredElement.textContent = this.questionsAnswered;
        this.correctAnswersElement.textContent = this.correctAnswers;
        const accuracy = Math.round((this.correctAnswers / this.questionsAnswered) * 100);
        this.accuracyElement.textContent = `${accuracy}%`;

        this.questionElement.textContent = 'Game Complete!';
        this.answerInput.style.display = 'none';
        this.submitBtn.style.display = 'none';
        this.nextBtn.style.display = 'none';
        this.restartBtn.style.display = 'block';
    }

    restartGame() {
        this.resetGame();
        this.startGame();
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    updateProgress() {
        const progress = (this.questionsAnswered / 10) * 100;
        this.progressElement.style.width = `${progress}%`;
    }

    showFeedback(message, type) {
        this.feedbackElement.textContent = message;
        this.feedbackElement.className = `feedback ${type}`;

        // Add animation
        this.feedbackElement.classList.add('fade-in');
        if (type === 'correct' || type === 'bonus') {
            this.feedbackElement.classList.add('correct-animation');
        } else if (type === 'incorrect') {
            this.feedbackElement.classList.add('incorrect-animation');
        }
    }

    clearFeedback() {
        this.feedbackElement.textContent = '';
        this.feedbackElement.className = 'feedback';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuickMathQuiz();
});

// Utility functions for potential future enhancements
function saveScore(score) {
    // Save to localStorage for leaderboard
    const scores = JSON.parse(localStorage.getItem('mathQuizScores') || '[]');
    scores.push({
        score,
        date: new Date().toISOString(),
        timestamp: Date.now()
    });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('mathQuizScores', JSON.stringify(scores.slice(0, 10))); // Keep top 10
}

function getHighScore() {
    const scores = JSON.parse(localStorage.getItem('mathQuizScores') || '[]');
    return scores.length > 0 ? scores[0].score : 0;
}
