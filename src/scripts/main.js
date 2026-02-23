import moment from 'moment';
import { GetBacon } from './utils';

const baconEl = document.querySelector('.bacon');
const timerDiv = document.querySelector('.timer');

function timer() {
  const timerTitle = document.createElement('h2');
  timerTitle.innerHTML = 'Timer';
  timerDiv.append(timerTitle);
}

function runTimer() {
  const ukrainianDate = moment().format('dddd, D MMMM YYYY');
  const newText = `Створено: ${ukrainianDate}`;
  timerDiv.append(newText);
}

timer();
runTimer();

GetBacon()
  .then((res) => {
    const markup = res.map((val) => `<p>${val}</p>`).join('');
    baconEl.innerHTML = markup;
  })
  .catch((err) => {
    baconEl.innerHTML = err;
    return err;
  });
