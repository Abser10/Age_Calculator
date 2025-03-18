const birthdateInput = document.getElementById("birthdate");
const nameInput = document.getElementById("name");
const result = document.getElementById("result");
const calculateBtn = document.getElementById("calculate");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
const themeToggle = document.getElementById("theme-toggle");
const modeLabel = document.getElementById("mode-label");

calculateBtn.addEventListener("click", () => {
  const birthdateValue = birthdateInput.value;
  const nameValue = nameInput.value.trim();

  if (!birthdateValue || !nameValue) {
    result.textContent = "Please enter both your name and birthdate.";
    result.classList.add("show");
    return;
  }

  const birthdate = new Date(birthdateValue);
  const today = new Date();

  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  const nextBirthday = new Date(
    today.getFullYear(),
    birthdate.getMonth(),
    birthdate.getDate()
  );
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const diffTime = nextBirthday - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Display result with name
  result.innerHTML = `<strong>${nameValue}</strong>, You are <strong>${age}</strong> years old. <br> Days left until your next birthday: <strong>${daysLeft}</strong> days.`;
  result.classList.add("show");

  // Add to history
  const historyItem = {
    name: nameValue,
    date: birthdateValue,
    age: age,
  };
  addToHistory(historyItem);
  saveHistory();
});

function addToHistory(item) {
  const li = document.createElement("li");
  const formattedDate = new Date(item.date).toLocaleDateString('en-GB');
  li.textContent = `${item.name} - Birthdate: ${formattedDate} - Age: ${item.age}`;
  historyList.appendChild(li);
}

function saveHistory() {
  const historyItems = [];
  historyList.querySelectorAll("li").forEach((li) => {
    historyItems.push(li.textContent);
  });
  localStorage.setItem("ageHistory", JSON.stringify(historyItems));
}

function loadHistory() {
  const historyItems = JSON.parse(localStorage.getItem("ageHistory"));
  if (historyItems) {
    historyItems.forEach((itemText) => {
      const li = document.createElement("li");
      li.textContent = itemText;
      historyList.appendChild(li);
    });
  }
}

clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
  localStorage.removeItem("ageHistory");
});

// Theme toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  modeLabel.textContent = document.body.classList.contains("dark")
    ? "Dark Mode"
    : "Light Mode";
});

// Load history on page load
loadHistory();
