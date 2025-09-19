// Subjects data for selected classes
const subjectsByClass = {
  6: [
    "Mathematics", "Science", "English", "Odia", "History",
    "Geography", "Hindi", "Sanskrit"
  ],
  7: [
    "English", "Odia", "Hindi", "History", "Geography",
    "Mathematics", "Physics", "Chemistry", "Biology", "Computer"
  ],
  8: [
    "Science", "Mathematics", "Geometry", "English", "Odia",
    "Social Science", "Hindi", "Sanskrit"
  ],
  9: [
    "English", "Odia", "Mathematics", "General Science", "Social Science",
    "Hindi", "Sanskrit"
  ],
  10: [
    "English", "Odia", "Mathematics", "General Science", "Social Science",
    "Hindi", "Sanskrit"
  ]
  // You can add class 6, 8, 11, 12 later
};

// Chapters data for each subject, class, and term
const chaptersBySubject = {
  6: {
    "Mathematics": {
      "Term I": ["Chapter 1: Numbers", "Chapter 2: Geometry", "Chapter 3: Algebra Basics"],
      "Term II": ["Chapter 4: Fractions", "Chapter 5: Decimals", "Chapter 6: Data Handling"]
    },
    "Science": {
      "Term I": ["Chapter 1: Living Things", "Chapter 2: Plants", "Chapter 3: Animals"],
      "Term II": ["Chapter 4: Matter", "Chapter 5: Force and Motion", "Chapter 6: Light and Sound"]
    }
    // Add more subjects as needed
  },
  7: {
    "Mathematics": {
      "Term I": ["Chapter 1: Integers", "Chapter 2: Fractions", "Chapter 3: Decimals"],
      "Term II": ["Chapter 4: Algebra", "Chapter 5: Geometry", "Chapter 6: Statistics"]
    },
    "English": {
      "Term I": [
        "Chapter 1 - Looking for Vulture’s Egg",
        "Chapter 2 - The School Boy",
        "Chapter 3 - Three Questions",
        "Chapter 4 - Coromandal Fishers",
        "Chapter 5 - The Lady of Shalott",
        "Chapter 6 - The Homecoming",
        "Chapter 7 - Grandpa Learns to Read and Write"
      ],
      "Term II": [
        "Chapter 8 - Travel",
        "Chapter 9 - Dares Salaam to Nairobi",
        "Chapter 10 - The Invisible Man",
        "Chapter 11 - Have you Got Brook in your Heart?",
        "Chapter 12 - The Model Millionare",
        "Chapter 13 - The Human Seasons",
        "Chapter 14 - Unbreakable"
      ]
    }
    // Add more subjects as needed
  }
  // Add for other classes
};

// Chapter options data: Study Resources (YouTube links), Notes, Quizzes, Games
const chapterOptionsData = {
  7: {
    "English": {
      "Term I": {
        "Chapter 1 - Looking for Vulture’s Egg": {
          "Study Resources": ["https://www.youtube.com/watch?v=example1", "https://www.youtube.com/watch?v=example2"],
          "Notes": "Short notes on the chapter: This chapter is about...",
          "Quizzes": "Quiz link or content here",
          "Games": "Game link or description here"
        },
        "Chapter 2 - The School Boy": {
          "Study Resources": ["https://www.youtube.com/watch?v=example3"],
          "Notes": "Short notes: The poem discusses...",
          "Quizzes": "Quiz content",
          "Games": "Game content"
        }
        // Add for other chapters
      },
      "Term II": {
        "Chapter 8 - Travel": {
          "Study Resources": ["https://www.youtube.com/watch?v=example4"],
          "Notes": "Short notes on travel...",
          "Quizzes": "Quiz",
          "Games": "Game"
        }
        // Add for other chapters
      }
    }
  }
  // Add for other classes/subjects
};

const classCards = document.querySelectorAll(".class-card");
const subjectSection = document.getElementById("subjectSection");
const subjectList = document.getElementById("subjectList");
const subjectTitle = document.getElementById("subjectTitle");
const termSection = document.getElementById("termSection");
const termList = document.getElementById("termList");
const termTitle = document.getElementById("termTitle");
const chaptersSection = document.getElementById("chaptersSection");
const chaptersList = document.getElementById("chaptersList");
const chaptersTitle = document.getElementById("chaptersTitle");
const profileButton = document.getElementById("profileButton");

// Handle class click
classCards.forEach(card => {
  card.addEventListener("click", () => {
    const selectedClass = card.getAttribute("data-class");
    loadSubjects(selectedClass);
  });
});

profileButton.addEventListener("click", () => {
  window.location.href = "studentProfilePage/profile.html";
});

function loadSubjects(selectedClass) {
  subjectList.innerHTML = ""; // clear old subjects
  subjectTitle.textContent = `Subjects for Class ${selectedClass}`;

  termSection.classList.add("hidden");
  subjectSection.classList.remove("hidden");
  termList.innerHTML = "";
  chaptersSection.classList.add("hidden");
  chaptersList.innerHTML = "";

  if (subjectsByClass[selectedClass]) {
    subjectsByClass[selectedClass].forEach(sub => {
      const btn = document.createElement("button");
      btn.classList.add("subject-card");
      btn.textContent = sub;
      btn.onclick = () => {
        loadTerms(selectedClass, sub);
      };
      subjectList.appendChild(btn);
    });
  } else {
    subjectList.innerHTML = "<p>Subjects coming soon...</p>";
  }
}

function loadTerms(selectedClass, selectedSubject) {
  termList.innerHTML = "";
  termTitle.textContent = `Terms for ${selectedSubject} (Class ${selectedClass})`;

  const terms = ["Term I", "Term II"];

  terms.forEach(term => {
    const btn = document.createElement("button");
    btn.classList.add("term-card");
    btn.textContent = term;
    btn.onclick = () => {
      showChapters(selectedClass, selectedSubject, term);
    };
    termList.appendChild(btn);
  });

  subjectSection.classList.add("hidden");
  termSection.classList.remove("hidden");
  // Keep chaptersSection visible to allow switching terms and viewing chapters
  // chaptersSection.classList.add("hidden");
  // chaptersList.innerHTML = "";
}

function showChapters(selectedClass, selectedSubject, selectedTerm) {
  chaptersList.innerHTML = "";
  chaptersTitle.textContent = `Chapters for ${selectedSubject} - ${selectedTerm} (Class ${selectedClass})`;

  const chapters = (chaptersBySubject[selectedClass] &&
                    chaptersBySubject[selectedClass][selectedSubject] &&
                    chaptersBySubject[selectedClass][selectedSubject][selectedTerm]) || [];

  if (chapters.length > 0) {
    chapters.forEach(chapter => {
      const btn = document.createElement("button");
      btn.classList.add("chapter-card");
      btn.textContent = chapter;
      btn.onclick = () => {
        showChapterOptions(selectedClass, selectedSubject, selectedTerm, chapter);
      };
      chaptersList.appendChild(btn);
    });
  } else {
    chaptersList.innerHTML = "<p>No chapters found for this term.</p>";
  }

  // Keep termSection visible to allow switching terms
  // termSection.classList.add("hidden");
  chaptersSection.classList.remove("hidden");
}

function showChapterOptions(selectedClass, selectedSubject, selectedTerm, selectedChapter) {
  const chapterOptionsSection = document.getElementById("chapterOptionsSection");
  const chapterOptionsList = document.getElementById("chapterOptionsList");
  const chapterOptionsTitle = document.getElementById("chapterOptionsTitle");
  const backToChaptersBtn = document.getElementById("backToChaptersBtn");

  chapterOptionsList.innerHTML = "";
  chapterOptionsTitle.textContent = `Options for ${selectedChapter}`;

  const options = chapterOptionsData[selectedClass] &&
                   chapterOptionsData[selectedClass][selectedSubject] &&
                   chapterOptionsData[selectedClass][selectedSubject][selectedTerm] &&
                   chapterOptionsData[selectedClass][selectedSubject][selectedTerm][selectedChapter];

  if (options) {
    const optionKeys = ["Study Resources", "Notes", "Quizzes", "Games"];
    optionKeys.forEach(option => {
      const btn = document.createElement("button");
      btn.classList.add("chapter-option-card");
      btn.textContent = option;
      btn.onclick = () => {
        handleOptionClick(option, options[option]);
      };
      chapterOptionsList.appendChild(btn);
    });
  } else {
    chapterOptionsList.innerHTML = "<p>No options available for this chapter.</p>";
  }

  chaptersSection.classList.add("hidden");
  chapterOptionsSection.classList.remove("hidden");

  backToChaptersBtn.onclick = () => {
    chapterOptionsSection.classList.add("hidden");
    chaptersSection.classList.remove("hidden");
  };
}

function handleOptionClick(option, data) {
  if (option === "Study Resources") {
    // Open YouTube links in new tabs
    data.forEach(link => {
      window.open(link, '_blank');
    });
  } else {
    // For Notes, Quizzes, Games, show an alert or redirect as needed
    alert(`${option}: ${data}`);
  }
}
