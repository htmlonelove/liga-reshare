const numbersElements = document.querySelectorAll('[data-number-to]');
const DURATION = 200;
const DELAY = 10;

const changeNumbers = (el) => {
  let timer;

  const initialValue = 0;
  const desiredValue = Number(el.dataset.numberTo);
  const step = desiredValue / (DURATION - DELAY);
  let currentValue = initialValue;
  el.classList.add('show');
  timer = setInterval(() => {
    currentValue += step;
    el.textContent = Math.floor(currentValue);
    if (currentValue >= desiredValue) {
      clearInterval(timer);
    }
  }, DELAY);
};

const returnAnimatePoint = (el) => {
  const elTop = el.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  return windowHeight / 1.1 - elTop;
};

const trackingAnimateBlocks = () => {
  numbersElements.forEach((number) => {
    if (returnAnimatePoint(number) > 0 && !number.classList.contains('show')) {
      number.classList.add('show');
      changeNumbers(number);
    }
  });
};

const initChangeNumber = () => {
  if (numbersElements.length) {
    trackingAnimateBlocks();
    window.addEventListener('scroll', trackingAnimateBlocks);
  }
};

export {initChangeNumber};
