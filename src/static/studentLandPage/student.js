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
      // You can add onclick for further actions, e.g., load chapter content
      chaptersList.appendChild(btn);
    });
  } else {
    chaptersList.innerHTML = "<p>No chapters found for this term.</p>";
  }

  // Keep termSection visible to allow switching terms
  // termSection.classList.add("hidden");
  chaptersSection.classList.remove("hidden");
}
