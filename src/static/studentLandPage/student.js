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
  },
  10: {
    "English": {
      "Term I": [
        "All Things Bright & Beautiful",
        "A Letter to God",
        "At the High School",
        "A Tiger in the House",
        "The Solitary Reaper",
        "Festivals of North-East India",
        "The Beggar",
        "A Great Son of India"
      ],
      "Term II": [
        "Air Pollution: A Hidden Menace",
        "Village Song",
        "The Flower-School",
        "The Village Judge",
        "A Grain as big as a Hen’s Egg",
        "From the Formalin Jar",
        "School’s Goodbye"
      ]
    },
    "Odia": {
      "Term I": [
        "ଆଶା",
        "ବୁଦ୍ଧୁ",
        "କଳାହାନ୍ତିର ମହିଳା",
        "ଜଗନ୍ନାଥ",
        "ଗଳ୍ପ",
        "ମାଆ",
        "ଅଳକାନନ୍ଦା",
        "ଆତ୍ମଜୀବନ",
        "ବଳରାମ",
        "ରାଧାକାନ୍ତ ରଥଙ୍କ ଆତ୍ମକଥା",
        "ଚାଳିଗାଲା ସାଧାରଣ ହୃଦୟ",
        "ଅଶ୍ରୁଧାରା ଓ ହସ୍ତାକ୍ଷର",
        "ମାନବ ସମ୍ମାନର ତେଜ",
        "ଫୁଲ୍ମୁହି"
      ],
      "Term II": [
        "ମହାତ୍ମା ଗାନ୍ଧୀଙ୍କ ଆଶା",
        "କଳାହାନ୍ତିର କଥା",
        "ପ୍ରଜ୍ଞାସାଧନା (ମାନବତା)",
        "ମାତୃଭାଷାର ଲୋକଜୀବନ",
        "ଜଣେକଣ୍ଡୁ ବିଚିତ୍ରାନନ୍ଦ",
        "କୋଳାହଳ",
        "ହରିଶ୍ଚନ୍ଦ୍ର",
        "ଦୁଇଟି ଲୋକକଥା",
        "ବଳରାମ",
        "ଓଡ଼ିଆ ସାହିତ୍ୟର କଥା",
        "ଜଳ, ଅଗ୍ନି ଓ ବନ୍ଦୀଶିବ"
      ]
    }
  }
  // Add for other classes
};

// Chapter options data: Study Resources (YouTube links), Notes, Quizzes, Games
const chapterOptionsData = {
  7: {
    "English": {
      "Term I": {
        "Chapter 1 - Looking for Vulture’s Egg": {
          "Study Resources": ["https://youtu.be/Uu3bS5Wo4Bg?si=q8ah_ZBq5FaZA7q5"],
          "Notes": "https://drive.google.com/file/d/1FmGj_auruXs3WehfuzGlu-WrRM4slZe1/view?usp=drivesdk",
          "Quizzes": "https://example.com/quizzes/chapter1",
          "Games": "https://example.com/games/chapter1"
        },
        "Chapter 2 - The School Boy": {
          "Study Resources": ["https://youtu.be/XPeAhNTOeAU?si=Ws4NrxJeaxlJ-0tv"],
          "Notes": "https://drive.google.com/file/d/1VFuToc2HSpWaS4DvI3NKNngBRbbUXOLz/view?usp=drivesdk",
          "Quizzes": "https://example.com/quizzes/chapter2",
          "Games": "https://example.com/games/chapter2"
        }
        // Add for other chapters
      },
      "Term II": {
        "Chapter 8 - Travel": {
          "Study Resources": ["https://www.youtube.com/watch?v=example4"],
          "Notes": "https://example.com/notes/chapter8",
          "Quizzes": "https://example.com/quizzes/chapter8",
          "Games": "https://example.com/games/chapter8"
        }
        // Add for other chapters
      }
    }
  },
  10: {
    "English": {
      "Term I": {
        "All Things Bright & Beautiful": {
          "Study Resources": ["https://example.com/study/bright"],
          "Notes": "https://example.com/notes/bright",
          "Quizzes": "/quiz10English",
          "Games": "https://example.com/games/bright"
        },
        "A Letter to God": {
          "Study Resources": ["https://example.com/study/letter"],
          "Notes": "https://example.com/notes/letter",
          "Quizzes": "https://example.com/quizzes/letter",
          "Games": "https://example.com/games/letter"
        },
        "At the High School": {
          "Study Resources": ["https://example.com/study/highschool"],
          "Notes": "https://example.com/notes/highschool",
          "Quizzes": "https://example.com/quizzes/highschool",
          "Games": "https://example.com/games/highschool"
        },
        "A Tiger in the House": {
          "Study Resources": ["https://example.com/study/tiger"],
          "Notes": "https://example.com/notes/tiger",
          "Quizzes": "https://example.com/quizzes/tiger",
          "Games": "https://example.com/games/tiger"
        },
        "The Solitary Reaper": {
          "Study Resources": ["https://example.com/study/reaper"],
          "Notes": "https://example.com/notes/reaper",
          "Quizzes": "https://example.com/quizzes/reaper",
          "Games": "https://example.com/games/reaper"
        },
        "Festivals of North-East India": {
          "Study Resources": ["https://example.com/study/festivals"],
          "Notes": "https://example.com/notes/festivals",
          "Quizzes": "https://example.com/quizzes/festivals",
          "Games": "https://example.com/games/festivals"
        },
        "The Beggar": {
          "Study Resources": ["https://example.com/study/beggar"],
          "Notes": "https://example.com/notes/beggar",
          "Quizzes": "https://example.com/quizzes/beggar",
          "Games": "https://example.com/games/beggar"
        },
        "A Great Son of India": {
          "Study Resources": ["https://example.com/study/son"],
          "Notes": "https://example.com/notes/son",
          "Quizzes": "https://example.com/quizzes/son",
          "Games": "https://example.com/games/son"
        }
      },
      "Term II": {
        "Air Pollution: A Hidden Menace": {
          "Study Resources": ["https://example.com/study/pollution"],
          "Notes": "https://example.com/notes/pollution",
          "Quizzes": "https://example.com/quizzes/pollution",
          "Games": "https://example.com/games/pollution"
        },
        "Village Song": {
          "Study Resources": ["https://example.com/study/song"],
          "Notes": "https://example.com/notes/song",
          "Quizzes": "https://example.com/quizzes/song",
          "Games": "https://example.com/games/song"
        },
        "The Flower-School": {
          "Study Resources": ["https://example.com/study/flower"],
          "Notes": "https://example.com/notes/flower",
          "Quizzes": "https://example.com/quizzes/flower",
          "Games": "https://example.com/games/flower"
        },
        "The Village Judge": {
          "Study Resources": ["https://example.com/study/judge"],
          "Notes": "https://example.com/notes/judge",
          "Quizzes": "https://example.com/quizzes/judge",
          "Games": "https://example.com/games/judge"
        },
        "A Grain as big as a Hen’s Egg": {
          "Study Resources": ["https://example.com/study/grain"],
          "Notes": "https://example.com/notes/grain",
          "Quizzes": "https://example.com/quizzes/grain",
          "Games": "https://example.com/games/grain"
        },
        "From the Formalin Jar": {
          "Study Resources": ["https://example.com/study/jar"],
          "Notes": "https://example.com/notes/jar",
          "Quizzes": "https://example.com/quizzes/jar",
          "Games": "https://example.com/games/jar"
        },
        "School’s Goodbye": {
          "Study Resources": ["https://example.com/study/goodbye"],
          "Notes": "https://example.com/notes/goodbye",
          "Quizzes": "https://example.com/quizzes/goodbye",
          "Games": "https://example.com/games/goodbye"
        }
      }
    },
    "Odia": {
      "Term I": {
        "ଆଶା": {
          "Study Resources": ["https://www.youtube.com/watch?v=odia1"],
          "Notes": "https://docs.google.com/document/d/1r7vrcIiVVyPKJtNVc92-xKCUWvkXJgyup5AoPtoiVBM/edit?usp=sharing",
          "Quizzes": "https://example.com/quizzes/odia1",
          "Games": "https://example.com/games/odia1"
        },
        "କଳାହାନ୍ତିର ମହିଳା": {
          "Study Resources": ["https://www.youtube.com/watch?v=odia2"],
          "Notes": "https://docs.google.com/document/d/1r7vrcIiVVyPKJtNVc92-xKCUWvkXJgyup5AoPtoiVBM/edit?usp=sharing",
          "Quizzes": "https://example.com/quizzes/odia2",
          "Games": "https://example.com/games/odia2"
        }
        // Add for other chapters
      },
      "Term II": {
        "ମହାତ୍ମା ଗାନ୍ଧୀଙ୍କ ଆଶା": {
          "Study Resources": ["https://www.youtube.com/watch?v=odia3"],
          "Notes": "https://docs.google.com/document/d/1r7vrcIiVVyPKJtNVc92-xKCUWvkXJgyup5AoPtoiVBM/edit?usp=sharing",
          "Quizzes": "https://example.com/quizzes/odia3",
          "Games": "https://example.com/games/odia3"
        },
        "କଳାହାନ୍ତିର କଥା": {
          "Study Resources": ["https://www.youtube.com/watch?v=odia4"],
          "Notes": "https://docs.google.com/document/d/1r7vrcIiVVyPKJtNVc92-xKCUWvkXJgyup5AoPtoiVBM/edit?usp=sharing",
          "Quizzes": "https://example.com/quizzes/odia4",
          "Games": "https://example.com/games/odia4"
        }
        // Add for other chapters
      }
    }
  },
  6: {
    "Mathematics": {
      "Term I": {
        "Chapter 1: Numbers": {
          "Study Resources": ["https://example.com/study/numbers"],
          "Notes": "https://example.com/notes/numbers",
          "Quizzes": "https://example.com/quizzes/numbers",
          "Games": "/game1"
        },
        "Chapter 2: Geometry": {
          "Study Resources": ["https://example.com/study/geometry"],
          "Notes": "https://example.com/notes/geometry",
          "Quizzes": "https://example.com/quizzes/geometry",
          "Games": "/game1"
        },
        "Chapter 3: Algebra Basics": {
          "Study Resources": ["https://example.com/study/algebra"],
          "Notes": "https://example.com/notes/algebra",
          "Quizzes": "https://example.com/quizzes/algebra",
          "Games": "/game1"
        }
      },
      "Term II": {
        "Chapter 4: Fractions": {
          "Study Resources": ["https://example.com/study/fractions"],
          "Notes": "https://example.com/notes/fractions",
          "Quizzes": "https://example.com/quizzes/fractions",
          "Games": "/game1"
        },
        "Chapter 5: Decimals": {
          "Study Resources": ["https://example.com/study/decimals"],
          "Notes": "https://example.com/notes/decimals",
          "Quizzes": "https://example.com/quizzes/decimals",
          "Games": "/game1"
        },
        "Chapter 6: Data Handling": {
          "Study Resources": ["https://example.com/study/data"],
          "Notes": "https://example.com/notes/data",
          "Quizzes": "https://example.com/quizzes/data",
          "Games": "/game1"
        }
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
  // window.location.href = "/studentProfilePage/profile";
  window.location.href = "/profile";
  window.location.href = "/profile";
});

function loadSubjects(selectedClass) {
  subjectList.innerHTML = ""; // clear old subjects
  subjectTitle.textContent = `Subjects for Class ${selectedClass}`;

  termSection.classList.add("hidden");
  subjectSection.classList.remove("hidden");
  termList.innerHTML = "";
  chaptersSection.classList.add("hidden");
  chaptersList.innerHTML = "";

  // Scroll to subject section after showing it
  subjectSection.scrollIntoView({ block: "center", behavior: "smooth" });

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

  // Instead of hiding subjectSection, keep it visible to allow easy subject switching
  // subjectSection.classList.add("hidden");
  termSection.classList.remove("hidden");

  // Scroll to term section after showing it
  termSection.scrollIntoView({ block: "center", behavior: "smooth" });

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

  // Scroll to chapters section after showing it
  chaptersSection.scrollIntoView({ block: "center", behavior: "smooth" });
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

  // Scroll to chapter options section after showing it
  chapterOptionsSection.scrollIntoView({ block: "center", behavior: "smooth" });

  backToChaptersBtn.onclick = () => {
    chapterOptionsSection.classList.add("hidden");
    chaptersSection.classList.remove("hidden");
  };
}

function handleOptionClick(option, data) {
  if (option === "Study Resources" || option === "Notes" || option === "Quizzes" || option === "Games") {
    // Redirect to the link (for now using data as link, user can change later)
    if (Array.isArray(data)) {
      // If data is array (like Study Resources), open all links in new tabs
      data.forEach(link => {
        window.open(link, '_blank');
      });
    } else {
      // For Notes, Quizzes, Games, treat data as a URL string for redirection
      window.open(data, '_blank');
    }
  } else {
    alert(`${option}: ${data}`);
  }
}
