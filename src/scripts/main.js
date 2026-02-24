import moment from 'moment';

const timerDiv = document.querySelector('.timer');
let timerNumber = 0;

function runTimer(minutes) {
  let totalSeconds = minutes * 60;
  const timerCounDown = document.querySelector('.timer-countdown');
  let setMoment = moment.duration(totalSeconds, 'seconds');
  let showRemainingTimeInSeconds = moment.utc(0);
  showRemainingTimeInSeconds.add(setMoment);
  timerCounDown.innerHTML = showRemainingTimeInSeconds.format('mm:ss');
  if (totalSeconds > 0) {
    totalSeconds -= 1;
  } else {
    const startButton = document.querySelector('.start');
    startButton.style.display = 'block';
    timerNumber = 0;
  }
  const myInterval = setInterval(() => {
    setMoment = moment.duration(totalSeconds, 'seconds');
    showRemainingTimeInSeconds = moment.utc(0);
    showRemainingTimeInSeconds.add(setMoment);
    timerCounDown.innerHTML = showRemainingTimeInSeconds.format('mm:ss');
    if (totalSeconds > 0) {
      totalSeconds -= 1;
    } else {
      clearInterval(myInterval);
      const startButton = document.querySelector('.start');
      startButton.style.display = 'block';
      const statusMessage = document.querySelector('.status_message');
      statusMessage.innerHTML = 'Вкажіть час в хвилинах';
      const timerCount = document.querySelector('.timer-countdown');
      timerNumber = 0;
      timerCount.innerHTML = timerNumber;
    }
  }, 1000);
  const ukrainianDate = moment().format('dddd, D MMMM YYYY mm:ss');
  const newText = `Створено: ${ukrainianDate}`;
  timerDiv.append(newText);
}

function renderButtons() {
  const startButton = document.createElement('button');
  const plusButton = document.createElement('button');
  const minusButton = document.createElement('button');
  startButton.className = 'start';
  plusButton.className = 'plusMin';
  minusButton.className = 'minusMin';
  startButton.innerText = 'Start';
  plusButton.innerText = '+';
  minusButton.innerText = '-';
  timerDiv.append(minusButton, plusButton, startButton);
}

function timer() {
  renderButtons();
  const statusMessage = document.querySelector('status_message');
  const startButton = document.querySelector('.start');
  const timerCount = document.createElement('p');
  timerCount.className = 'timer-countdown';
  timerCount.innerHTML = timerNumber;
  timerDiv.append(timerCount);

  timerDiv.addEventListener('click', (event) => {
    const { target } = event;
    if (target.className === 'start' && timerNumber > 0) {
      target.style.display = 'none';
      runTimer(timerNumber);
      statusMessage.innerHTML = 'Залишилось';
    }
    if (target.className === 'plusMin') {
      if (startButton.style.display !== 'none') {
        timerNumber += 1;
        timerCount.innerHTML = +timerNumber;
      }
    }
    if (target.className === 'minusMin') {
      if (timerNumber !== 0 && startButton.style.display !== 'none') {
        timerNumber -= 1;
        timerCount.innerHTML = +timerNumber;
      }
    }
  });
}

timer();
