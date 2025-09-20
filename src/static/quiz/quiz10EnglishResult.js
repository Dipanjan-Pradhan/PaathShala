document.addEventListener('DOMContentLoaded', displayResults);

document.getElementById('retryBtn').addEventListener('click', retryQuiz);

function displayResults() {
  const score = localStorage.getItem('quizScore');
  const accuracy = localStorage.getItem('quizAccuracy');
  const timeTaken = localStorage.getItem('quizTimeTaken');
  const level = localStorage.getItem('quizLevel');

  // Check if all required data exists
  if (!score || !accuracy || !timeTaken || !level) {
    document.getElementById('timeTakenDisplay').textContent = 'Error: Quiz data not found. Please take the quiz again.';
    document.getElementById('scoreDisplay').textContent = '';
    document.getElementById('accuracyDisplay').textContent = '';
    document.getElementById('levelDisplay').textContent = '';
    return;
  }

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  document.getElementById('timeTakenDisplay').textContent = `Time Taken: ${timeStr}`;
  document.getElementById('scoreDisplay').textContent = `Marks: ${score} / 20`;
  document.getElementById('accuracyDisplay').textContent = `Accuracy: ${accuracy}%`;
  document.getElementById('levelDisplay').textContent = `Level: ${level}`;

  // Apply level-based styling
  const levelElement = document.getElementById('levelDisplay');
  levelElement.className = level.toLowerCase();
}

function retryQuiz() {
  window.location.href = 'quiz10English';
}
