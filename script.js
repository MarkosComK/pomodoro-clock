
/// Elements
/// Settings
const settingsOpenEl = document.querySelector(".settings__open");
const overlayEl = document.querySelector(".overlay");
const settingsHideEl = document.getElementById("settings-hide");
const settingsCloseEl = document.querySelector(".settings__menu-close");
const pomodoroInputEl = document.getElementById("pomodoro-time");
const pomodoroArrUpEl = document.getElementById("pomodoro-up");
const pomodoroArrDownEl = document.getElementById("pomodoro-down");
const shortBrInputEl = document.getElementById("short-break");
const shortBrArrUpEl = document.getElementById("short-break-up");
const shortBrArrDownEl = document.getElementById("short-break-down");
const longBrInputEl = document.getElementById("long-break");
const longBrArrUpEl = document.getElementById("long-break-up");
const longBrArrDownEl = document.getElementById("long-break-down");
const settingsInputEls = document.querySelectorAll(
  ".settings__menu__form-group"
);
const applyBtnEl = document.querySelector(".btn--settings");

/// Timer
const timer = document.querySelector(".timer");
const timerInnerEl = document.querySelector(".timer__inner");
const timeDisplayEl = document.getElementById("time");
const timeMinutesEl = document.getElementById("time__minutes");
const timeSecondsEl = document.getElementById("time__seconds");

const timerArcEl = document.getElementById("timer-arc");
const timerStatusEl = document.getElementById("timer__status");
const bellEl = new Audio("./assets/singing-bowl-strike-sound-84682.mp3");
/// Arc
let centerX = timerInnerEl.offsetWidth / 2;
let centerY = timerInnerEl.offsetHeight / 2;
let radius = centerX * 0.9;
const startAngle = 0;
const endAngle = 359.9;

/// Modus Switch
const modusEl = document.querySelector(".modus-switch");
const pomodoroBtnEl = document.getElementById("pomodoroBtn");
const shortBreakBtnEl = document.getElementById("shortBreakBtn");
const longBreakBtnEl = document.getElementById("longBreakBtn");

//////////////
// Code snippet from [@opsb](https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle)

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
  return d;
}

// Snippet End

// Helpers

const minsToSec = (minutes) => minutes * 60;
const stringifySeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const sec =
    String(seconds % 60).length === 1 ? `0${seconds % 60}` : `${seconds % 60}`;
  // return `${minutes}:${sec}`;
  appliedState.displayMins = String(minutes);
  appliedState.displaySec = String(sec);
};

const openModal = function () {
  overlayEl.classList.remove("hidden");
  settingsHideEl.classList.remove("hidden");
};

const closeModal = function () {
  overlayEl.classList.add("hidden");
  settingsHideEl.classList.add("hidden");
};

/// App functions

const INITIAL_STATE = {
  bodyTheme: "theme-1",
  bodyFont: "font-1",
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 10,
  modus: "pomodoro",
  fullTime: 15000,
  secToGo: 1500,
  tenthSecToGo: 15000,
  active: false,
  displayMins: "25",
  displaySec: "00",
};

let intervallID;

const appliedState = {
  ...INITIAL_STATE,
};

const updateArc = function () {
  const newEndAngle =
    appliedState.tenthSecToGo === 0
      ? 359.9
      : (appliedState.tenthSecToGo * 359.9) / appliedState.fullTime;
  timerArcEl.setAttribute(
    "d",
    describeArc(centerX, centerY, radius, startAngle, newEndAngle)
  );
};

const countDown = function () {
  appliedState.tenthSecToGo--;
  if (appliedState.tenthSecToGo % 10 === 0) {
    appliedState.secToGo--;
    // timeDisplayEl.textContent = stringifySeconds(appliedState.secToGo);
    stringifySeconds(appliedState.secToGo);
    timeMinutesEl.textContent = appliedState.displayMins;
    timeSecondsEl.textContent = appliedState.displaySec;
  }
};

const pauseTimer = function () {
  appliedState.active = false;
  clearInterval(intervallID);

  timerStatusEl.textContent = "restart";
  if (!appliedState.secToGo) {
    if (appliedState.modus === "pomodoro") timerStatusEl.textContent = "break";
    else timerStatusEl.textContent = "pomodoro";
  }
};

const startTimer = function () {
  appliedState.active = true;
  countDown();
  updateArc();
  timerStatusEl.textContent = "pause";

  intervallID = setInterval(() => {
    if (appliedState.tenthSecToGo === 1) {
      countDown();
      bellEl.play();
      updateArc();

      pauseTimer();
    } else {
      countDown();
      updateArc();
    }
  }, 100);
};

const toggleTimer = function () {
  if (appliedState.active) pauseTimer();
  else startTimer();
};

const applySettings = function () {
  appliedState.bodyTheme = document.querySelector(
    ".settings__menu__radio-btn--color:checked"
  ).value;
  appliedState.bodyFont = document.querySelector(".font-btn:checked").value;

  document.body.classList.remove("theme-1");
  document.body.classList.remove("theme-2");
  document.body.classList.remove("theme-3");
  document.body.classList.remove("font-1");
  document.body.classList.remove("font-2");
  document.body.classList.remove("font-3");

  document.body.classList.add(appliedState.bodyTheme);
  document.body.classList.add(appliedState.bodyFont);

  appliedState.pomodoro = +pomodoroInputEl.value;
  appliedState.shortBreak = +shortBrInputEl.value;
  appliedState.longBreak = +longBrInputEl.value;
  appliedState.secToGo = minsToSec(appliedState[appliedState.modus]);
  appliedState.fullTime = appliedState.secToGo * 10;
  appliedState.tenthSecToGo = appliedState.fullTime;
  timeDisplayEl.textContent = `${pomodoroInputEl.value}:00`;
  timerStatusEl.textContent = "start";
  switchModus(pomodoroBtnEl);
};

const switchModus = function (button) {
  pauseTimer();
  [pomodoroBtnEl, shortBreakBtnEl, longBreakBtnEl].forEach((element) =>
    element.classList.remove("btn--active")
  );
  button.classList.add("btn--active");
  appliedState.modus = button.value;
  appliedState.secToGo = minsToSec(appliedState[appliedState.modus]);
  appliedState.fullTime = appliedState.secToGo * 10;
  appliedState.tenthSecToGo = appliedState.fullTime;
  // timeDisplayEl.textContent = stringifySeconds(appliedState.secToGo);
  stringifySeconds(appliedState.secToGo);
  timeMinutesEl.textContent = appliedState.displayMins;
  timeSecondsEl.textContent = appliedState.displaySec;
  timerStatusEl.textContent = "start";
};

/// Event Listeners
const setupListeners = function () {
  settingsOpenEl.addEventListener("click", () => {
    openModal();
  });

  applyBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
    applySettings();
  });

  [settingsCloseEl, overlayEl].forEach((element) =>
    element.addEventListener("click", () => {
      closeModal();
    })
  );

  window.addEventListener("keydown", (e) => {
    const keysCloseModal = ["Escape", "Delete"];
    if (keysCloseModal.includes(e.key)) closeModal();

    if (e.key === "Enter") {
      applySettings();
      closeModal();
    }
  });

  [pomodoroArrUpEl, shortBrArrUpEl, longBrArrUpEl].forEach((element) =>
    element.addEventListener("click", (e) => {
      const inputEl = e.target.closest("svg").nextSibling.nextSibling;
      inputEl.value = +inputEl.value < 46 ? +inputEl.value + 1 : inputEl.value;
    })
  );

  [pomodoroArrDownEl, shortBrArrDownEl, longBrArrDownEl].forEach((element) =>
    element.addEventListener("click", (e) => {
      const inputEl = e.target.closest("svg").previousSibling.previousSibling;
      inputEl.value = +inputEl.value > 1 ? +inputEl.value - 1 : inputEl.value;
    })
  );

  modusEl.addEventListener("click", (e) => {
    const button = e.target.closest(".btn");
    if (!button) return;
    switchModus(button);
  });

  window.addEventListener("DOMContentLoaded", function () {
    timerArcEl.setAttribute(
      "d",
      describeArc(centerX, centerY, radius, startAngle, endAngle)
    );
  });

  const resizeObserver = new ResizeObserver((e) => {
    for (const entry of e) {
      if (!entry.target === ".inner__timer") return;
      centerX = entry.contentRect.width / 2;
      centerY = entry.contentRect.height / 2;
      radius = centerX * 0.9;
      updateArc();
    }
  });

  resizeObserver.observe(timerInnerEl);

  timer.addEventListener("click", () => {
    if (timerStatusEl.textContent === "break") switchModus(shortBreakBtnEl);
    else if (timerStatusEl.textContent === "pomodoro")
      switchModus(pomodoroBtnEl);
    else toggleTimer();
  });
};

const init = function () {
  document.body.style.height = window.innerHeight;
  setupListeners();
};

init();
