function getCurrentTime() {
  return new Date();
}

function formatNumber(number) {
  return number.toString().padStart(2, "0");
}

function updateDigitalClock(date) {
  const hours = formatNumber(date.getHours());
  const minutes = formatNumber(date.getMinutes());
  const seconds = formatNumber(date.getSeconds());

  document.getElementById(
    "digital-time"
  ).textContent = `${hours}:${minutes}:${seconds}`;
}

function calculateClockAngle(date) {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  return {
    secondsDeg: seconds * 6,
    minutesDeg: minutes * 6,
    hoursDeg: (hours % 12) * 30 + minutes * 0.5,
  };
}

function updateAnalogClock(angles) {
  document.getElementById(
    "second-hand"
  ).style.transform = `translateX(-50%) rotate(${angles.secondsDeg}deg)`;

  document.getElementById(
    "minute-hand"
  ).style.transform = `translateX(-50%) rotate(${angles.minutesDeg}deg)`;

  document.getElementById(
    "hour-hand"
  ).style.transform = `translateX(-50%) rotate(${angles.hoursDeg}deg)`;
}

function updateClock() {
  const now = getCurrentTime();

  updateDigitalClock(now);

  const angles = calculateClockAngle(now);
  updateAnalogClock(angles);
}

setInterval(updateClock, 1000);
updateClock();
