const questions = [
  {
    question: "Who wrote the poem All Things Bright and Beautiful?",
    options: ["a) William Wordsworth", "b) Cecil Frances Alexander", "c) Ruskin Bond", "d) R.K. Narayan"],
    answer: "b"
  },
  {
    question: "What is the main theme of the poem?",
    options: ["a) Importance of education", "b) God’s wonderful creation", "c) Struggles of farmers", "d) Love for animals"],
    answer: "b"
  },
  {
    question: "The poet praises God for creating—",
    options: ["a) Buildings", "b) Machines", "c) Nature", "d) Factories"],
    answer: "c"
  },
  {
    question: "“Each little flower that opens” refers to—",
    options: ["a) Big trees", "b) Beautiful flowers", "c) Wild animals", "d) Food crops"],
    answer: "b"
  },
  {
    question: "What does the “purple-headed mountain” represent?",
    options: ["a) Clouds", "b) Hills at sunset", "c) Rivers", "d) Desert"],
    answer: "b"
  },
  {
    question: "The poem belongs to which type?",
    options: ["a) Epic", "b) Ode", "c) Hymn", "d) Ballad"],
    answer: "c"
  },
  {
    question: "What emotion does the poem express?",
    options: ["a) Anger", "b) Gratefulness", "c) Fear", "d) Surprise"],
    answer: "b"
  },
  {
    question: "The little birds sing—",
    options: ["a) In fear", "b) In joy", "c) In anger", "d) In sadness"],
    answer: "b"
  },
  {
    question: "Who made “the glowing colors of flowers”?",
    options: ["a) Man", "b) Sun", "c) God", "d) Birds"],
    answer: "c"
  },
  {
    question: "The poem teaches us to—",
    options: ["a) Earn more money", "b) Destroy nature", "c) Appreciate creation", "d) Build cities"],
    answer: "c"
  },
  {
    question: "Which line shows that all things are important?",
    options: ["a) Each little bird that sings", "b) The cold wind in the winter", "c) He gave us eyes to see them", "d) All things bright and beautiful"],
    answer: "d"
  },
  {
    question: "Which of the following is NOT mentioned in the poem?",
    options: ["a) Mountains", "b) Flowers", "c) Stars", "d) Cars"],
    answer: "d"
  },
  {
    question: "What gift did God give us to enjoy beauty?",
    options: ["a) Hands", "b) Eyes", "c) Feet", "d) Heart"],
    answer: "b"
  },
  {
    question: "What is described as “tiny”?",
    options: ["a) The mountain", "b) The flowers", "c) The sun", "d) The moon"],
    answer: "b"
  },
  {
    question: "Who created both “the rich man and the poor man”?",
    options: ["a) Nature", "b) Society", "c) God", "d) The King"],
    answer: "c"
  },
  {
    question: "Which season is described in the poem?",
    options: ["a) Winter", "b) Summer", "c) Rainy", "d) All seasons"],
    answer: "d"
  },
  {
    question: "The poem is mainly addressed to—",
    options: ["a) Students", "b) God", "c) Farmers", "d) Teachers"],
    answer: "b"
  },
  {
    question: "Which figure of speech is used in the poem?",
    options: ["a) Simile", "b) Personification", "c) Hyperbole", "d) Alliteration"],
    answer: "d"
  },
  {
    question: " “He made their glowing colors” refers to—",
    options: ["a) Fruits", "b) Birds", "c) Flowers", "d) Mountains"],
    answer: "c"
  },
  {
    question: "The overall tone of the poem is—",
    options: ["a) Pessimistic", "b) Joyful", "c) Angry", "d) Serious"],
    answer: "b"
  }
];

let timer;
let timeLeft;
let selectedTime;

document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
document.getElementById('submitQuizBtn').addEventListener('click', submitQuiz);
document.getElementById('retryBtn').addEventListener('click', retryQuiz);
document.getElementById('resetBtn').addEventListener('click', resetQuiz);

// Prevent form submission
document.getElementById('quizForm').addEventListener('submit', function(e) {
  e.preventDefault();
  submitQuiz();
});

function startQuiz() {
  selectedTime = parseInt(document.getElementById('timerSelect').value);
  timeLeft = selectedTime;
  document.querySelector('.timer-selection').classList.add('hidden');
  document.getElementById('quizSection').classList.remove('hidden');
  displayQuestions();
  startTimer();
}

function displayQuestions() {
  const container = document.getElementById('questionsContainer');
  container.innerHTML = '';
  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <p>${index + 1}. ${q.question}</p>
      <div class="options">
        ${q.options.map((opt, i) => `
          <label class="option">
            <input type="radio" name="q${index}" value="${opt.charAt(0)}"> ${opt}
          </label>
        `).join('')}
      </div>
    `;
    container.appendChild(div);
  });
}

function startTimer() {
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timeLeft').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function submitQuiz() {
  clearInterval(timer);
  const form = document.getElementById('quizForm');
  const formData = new FormData(form);
  let correct = 0;
  questions.forEach((q, index) => {
    const selected = formData.get(`q${index}`);
    if (selected === q.answer) {
      correct++;
    }
  });
  const score = correct;
  const accuracy = parseFloat(((correct / questions.length) * 100).toFixed(2));
  const timeTaken = selectedTime - timeLeft;
  let level;
  if (accuracy >= 90) level = 'Expert';
  else if (accuracy >= 70) level = 'Good';
  else if (accuracy >= 50) level = 'Average';
  else level = 'Beginner';

  localStorage.setItem('quizScore', score);
  localStorage.setItem('quizAccuracy', accuracy);
  localStorage.setItem('quizTimeTaken', timeTaken);
  localStorage.setItem('quizLevel', level);

  window.location.href = 'quiz10EnglishResult';
}

function retryQuiz() {
  window.location.href = 'quiz10English';
}

function resetQuiz() {
  clearInterval(timer);
  timeLeft = selectedTime;
  updateTimerDisplay();
  const form = document.getElementById('quizForm');
  form.reset();
}
