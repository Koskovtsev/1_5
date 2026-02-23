import { GetBacon } from './utils';

const baconEl = document.querySelector('.bacon');

GetBacon()
  .then((res) => {
    const markup = res.map((val) => `<p>${val}</p>`).join('');
    baconEl.innerHTML = markup;
  })
  .catch((err) => {
    baconEl.innerHTML = err;
    return err;
  });
