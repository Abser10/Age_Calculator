const historyList = document.getElementById("history-list");
const clearBtn = document.getElementById("clear-history");

// Main calculate button
document.getElementById("calculate").addEventListener("click", function() {
  const birthdate = document.getElementById("birthdate").value;
  const result = document.getElementById("result");

  result.classList.remove("show");
  result.style.color = "red";

  if (!birthdate) {
    result.innerText = "❌ Please select your birthdate!";
    setTimeout(() => result.classList.add("show"), 100);
    return;
  }

  const birth = new Date(birthdate);
  const today = new Date();

  if (birth > today) {
    result.innerText = "❌ Birthdate cannot be in the future!";
    setTimeout(() => result.classList.add("show"), 100);
    return;
  }

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  result.style.color = "green";
  result.innerText = `✅ Your Age: ${years} Years, ${months} Months, ${days} Days`;
  setTimeout(() => result.classList.add("show"), 100);

  // Save birthdate
  localStorage.setItem("birthdate", birthdate);

  // Save to history
  const historyEntry = `${birth.toLocaleDateString()} → ${years} Years, ${months} Months, ${days} Days`;
  saveHistory(historyEntry);
  addHistoryItem(historyEntry);
});







// Theme toggle functionality
const toggle = document.getElementById("theme-toggle");
const modeLabel = document.getElementById("mode-label");

// Check saved theme preference
window.addEventListener("DOMContentLoaded", function() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
    modeLabel.innerText = "Dark Mode";
  }
});

// Event listener for theme toggle
toggle.addEventListener("change", function() {
  if (toggle.checked) {
    document.body.classList.add("dark");
    modeLabel.innerText = "Dark Mode";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    modeLabel.innerText = "Light Mode";
    localStorage.setItem("theme", "light");
  }
});
