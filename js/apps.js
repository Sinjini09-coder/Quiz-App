

// Element references
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const authSection = document.getElementById("auth-section");
const dashboard = document.getElementById("dashboard");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const logoutBtn = document.getElementById("logout-btn");
const welcomeMsg = document.getElementById("welcome-msg");
const userNameEl = document.getElementById("user-name");
const userLevelEl = document.getElementById("user-level");

// Auth
const btnLogin = document.getElementById("btn-login");
const btnRegister = document.getElementById("btn-register");

// Quiz
const quizLevelSelect = document.getElementById("quiz-level-select");
const startQuizBtn = document.getElementById("start-quiz");
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const qIndexEl = document.getElementById("q-index");
const qTotalEl = document.getElementById("q-total");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitQuizBtn = document.getElementById("submit-quiz");
const scoreText = document.getElementById("score-text");
const resultDetails = document.getElementById("result-details");
const retakeBtn = document.getElementById("retake-btn");
const backDashBtn = document.getElementById("back-dash");

let currentUser = null;
let currentQuestions = [];
let currentIndex = 0;
let userAnswers = [];

// ---- AUTH SECTION ----
tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});

tabRegister.addEventListener("click", () => {
  tabRegister.classList.add("active");
  tabLogin.classList.remove("active");
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

// Register new user
btnRegister.addEventListener("click", () => {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const level = document.getElementById("reg-level").value;

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some(u => u.email === email)) {
    alert("User already exists!");
    return;
  }

  users.push({ name, email, password, level });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Please log in.");
  tabLogin.click();
});

// Login
btnLogin.addEventListener("click", () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return;
  }

  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));
  showDashboard();
});

function showDashboard() {
  authSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  welcomeMsg.textContent = `Hello, ${currentUser.name}`;
  userNameEl.textContent = currentUser.name;
  userLevelEl.textContent = currentUser.level;
}

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  location.reload();
});

// Auto-login if session exists
window.addEventListener("load", () => {
  const savedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (savedUser) {
    currentUser = savedUser;
    showDashboard();
  }
});

// ---- QUIZ SECTION ----
startQuizBtn.addEventListener("click", () => {
  const level = quizLevelSelect.value;
  currentQuestions = QUESTIONS[level];
  currentIndex = 0;
  userAnswers = Array(currentQuestions.length).fill(null);
  showQuestion();
  dashboard.classList.add("hidden");
  quizSection.classList.remove("hidden");
  qTotalEl.textContent = currentQuestions.length;
});

function showQuestion() {
  const q = currentQuestions[currentIndex];
  qIndexEl.textContent = currentIndex + 1;
  questionText.textContent = q.question;
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const div = document.createElement("div");
    div.classList.add("answer");
    div.textContent = ans;

    if (userAnswers[currentIndex] === i) div.classList.add("selected");

    div.addEventListener("click", () => {
      userAnswers[currentIndex] = i;
      document.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
      div.classList.add("selected");
    });
    answersDiv.appendChild(div);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.classList.toggle("hidden", currentIndex === currentQuestions.length - 1);
  submitQuizBtn.classList.toggle("hidden", currentIndex !== currentQuestions.length - 1);
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    showQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
});

submitQuizBtn.addEventListener("click", () => {
  const score = userAnswers.reduce((acc, ans, i) => {
    return acc + (ans === currentQuestions[i].correct ? 1 : 0);
  }, 0);

  showResult(score);
});

function showResult(score) {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  scoreText.textContent = `Your Score: ${score} / ${currentQuestions.length}`;

  resultDetails.innerHTML = currentQuestions.map((q, i) => {
    const correct = q.answers[q.correct];
    const userAns = userAnswers[i] !== null ? q.answers[userAnswers[i]] : "No answer";
    const color = userAnswers[i] === q.correct ? "var(--success)" : "var(--error)";
    return `
      <div class="card" style="border-left: 4px solid ${color}">
        <p><strong>Q${i + 1}:</strong> ${q.question}</p>
        <p>Your answer: ${userAns}</p>
        <p>Correct answer: ${correct}</p>
      </div>`;
  }).join("");
}

retakeBtn.addEventListener("click", () => {
  currentIndex = 0;
  userAnswers = Array(currentQuestions.length).fill(null);
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  showQuestion();
});

backDashBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
});
