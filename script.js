const calculateBtn = document.getElementById('calculateBtn');
const dobInput = document.getElementById('dob');
const resultDiv = document.getElementById('result');

calculateBtn.addEventListener('click', function() {
  const dobValue = dobInput.value;

  if (dobValue === '') {
    resultDiv.textContent = 'Please enter your date of birth!';
    return;
  }

  const dobDate = new Date(dobValue);
  const today = new Date();

  let age = today.getFullYear() - dobDate.getFullYear();

  const monthDiff = today.getMonth() - dobDate.getMonth();
  const dayDiff = today.getDate() - dobDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  resultDiv.textContent = `You are ${age} years old.`;
});
