import {getElTop} from '../utils/utils';
const links = document.querySelectorAll('[data-trigger]');

const getDuration = (distance, step) => {
  const defaultDuration = 500;
  const durationIncrement = 100;
  const count = Math.round(Math.abs(distance) / step);

  return defaultDuration + (durationIncrement * count);
};

const initMoveTo = () => {
  if (!links.length) {
    return;
  }
  links.forEach((link) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      document.activeElement.blur();
      const header = document.querySelector('.header');
      const target = document.querySelector('#' + link.href.split('#')[1]);
      const targetTopPosition = getElTop(target);
      const linkTopPosition = getElTop(link);
      const distance = targetTopPosition - linkTopPosition;

      const moveTo = new window.MoveTo({
        tolerance: header.clientHeight,
        duration: getDuration(distance, 300),
        easing: 'easeOutQuart',
        container: window,
      });

      moveTo.move(target);
    });
  });
};

export {initMoveTo};
