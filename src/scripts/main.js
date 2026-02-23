import moment from 'moment';
import { GetBacon } from './utils';

const baconEl = document.querySelector('.bacon');
const timerDiv = document.querySelector('.timer');

function runTimer() {
  const ukrainianDate = moment().format('dddd, D MMMM YYYY');
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

function showMessage() {
  const timerTitle = document.createElement('h2');
  timerTitle.innerHTML = 'Timer';
  const statusMessage = document.createElement('p');
  statusMessage.innerHTML = 'Вкажіть час в хвилинах';
  timerDiv.append(timerTitle, statusMessage);
  return statusMessage;
}

function timer() {
  const status = showMessage();
  renderButtons();
  const timerCount = document.createElement('p');
  let timerNumber = 0;
  timerCount.innerHTML = timerNumber;
  timerDiv.append(timerCount);

  timerDiv.addEventListener('click', (event) => {
    if (event.target.className === 'start') {
      runTimer();
      status.innerHTML = 'Залишилось';
    }
    if (event.target.className === 'plusMin') {
      timerNumber += 1;
      timerCount.innerHTML = +timerNumber;
    }
    if (event.target.className === 'minusMin') {
      timerNumber -= 1;
      timerCount.innerHTML = +timerNumber;
    }
  });
}

timer();

GetBacon()
  .then((res) => {
    const markup = res.map((val) => `<p>${val}</p>`).join('');
    baconEl.innerHTML = markup;
  })
  .catch((err) => {
    baconEl.innerHTML = err;
    return err;
  });
