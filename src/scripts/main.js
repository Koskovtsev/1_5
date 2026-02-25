import moment from 'moment';

const timerDiv = document.querySelector('.timer');
let timerNumber = 0;

function buttonsVisibility(display) {
  const buttons = document.querySelectorAll('wired-button');
  buttons.forEach((button) => {
    const { style } = button;
    style.display = display;
  });
}

function runTimer(minutes) {
  let totalSeconds = minutes * 60;
  const timerCounDown = document.querySelector('.timer-countdown');
  const statusMessage = document.querySelector('.status_message');
  const timerCount = document.querySelector('.timer-countdown');
  const updateDisplay = () => {
    const duration = moment.utc(totalSeconds * 1000);
    const format = totalSeconds >= 3600 ? 'HH:mm:ss' : 'mm:ss';
    timerCounDown.innerHTML = duration.format(format);
  };
  updateDisplay();
  if (totalSeconds > 0) {
    totalSeconds -= 1;
  } else {
    buttonsVisibility('block');
    timerNumber = 0;
  }
  const myInterval = setInterval(() => {
    if (totalSeconds > 0) {
      updateDisplay();
      totalSeconds -= 1;
      return;
    }
    clearInterval(myInterval);
    buttonsVisibility('block');
    timerNumber = 0;
    statusMessage.innerHTML = 'Укажіть час в хвилинах';
    timerCount.innerHTML = timerNumber;
  }, 1000);
}

function createCustomElement(elem, className, text, elevationValue) {
  const element = document.createElement(elem);
  element.className = className;
  if (text) {
    element.innerHTML = text;
  }
  if (elevationValue) {
    element.setAttribute('elevation', elevationValue);
  }
  return element;
}

function renderButtons() {
  const startSpan = createCustomElement('span', 'start', 'Start');
  const plusSpan = createCustomElement('span', 'plusMin', ' + ');
  const minusSpan = createCustomElement('span', 'minusMin', ' – ');
  const startButton = createCustomElement('wired-button', 'start', startSpan.outerHTML, '5');
  const plusButton = createCustomElement('wired-button', 'plusMin', plusSpan.outerHTML, '5');
  const minusButton = createCustomElement('wired-button', 'minusMin', minusSpan.outerHTML, '5');
  const timerLabel = createCustomElement('p', 'timer-countdown', '0');
  const setMinutesWrapper = createCustomElement('div', 'timer-minutes_wrapper');
  setMinutesWrapper.append(minusButton, timerLabel, plusButton);
  timerDiv.append(setMinutesWrapper, startButton);
}

function eventHandler(event) {
  const statusMessage = document.querySelector('.status_message');
  const timerCount = document.querySelector('.timer-countdown');
  const { target } = event;
  const buttonActions = {
    start: () => {
      if (timerNumber <= 0) {
        return;
      }
      buttonsVisibility('none');
      runTimer(timerNumber);
      statusMessage.innerHTML = 'Залишилось';
    },
    plusMin: () => {
      timerNumber += 1;
      timerCount.innerHTML = timerNumber;
    },
    minusMin: () => {
      timerCount.innerHTML = timerNumber !== 0 ? timerNumber -= 1 : 0;
    },
  };
  const keys = Object.keys(buttonActions);
  const actionKey = keys.find((className) => target.classList.contains(className));
  if (actionKey) {
    buttonActions[actionKey]();
  }
}

function timer() {
  renderButtons();
  timerDiv.addEventListener('click', (event) => {
    eventHandler(event);
  });
}

timer();
