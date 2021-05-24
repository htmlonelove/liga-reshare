const collapseItems = document.querySelectorAll('.collapse');

const HEIGHT_STEP = 300; // шаг высоты, на котором происходит замедление анимации

const calculateAnimationDuration = (distance, step) => {
  const defaultDuration = 300;
  const increment = 100;
  const count = Math.ceil(distance / step);

  return defaultDuration + (increment * count);
};

const isTopOverViewport = (elem) => {
  return elem.getBoundingClientRect().top < 0;
};

const animateMaxHeight = function (target, from, to, duration) {
  const scrollStart = window.scrollY || window.pageYOffset;
  const scrollNeeded = isTopOverViewport(target);
  const heightStart = from;
  const distance = to - from;
  let timeStart = null;

  // easeOutQuart
  const easing = function (t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  };

  const loop = (timeCurrent) => {
    if (timeStart === null) {
      timeStart = timeCurrent;
    }

    const timeElapsed = timeCurrent - timeStart;
    const next = easing(timeElapsed, heightStart, distance, duration);

    target.style.maxHeight = next + 'px';

    if (scrollNeeded) {
      window.scrollTo(0, (scrollStart - (heightStart - next)));
    }

    if (timeElapsed < duration) {
      window.requestAnimationFrame(loop);
    } else {
      target.style.maxHeight = to + 'px';

      if (scrollNeeded) {
        window.scrollTo(0, (scrollStart - heightStart));
      }
    }
  };

  window.requestAnimationFrame(loop);
};

const setCollapse = (collapseItem) => {
  const hidden = collapseItem.querySelector('.collapse__hidden');
  const toggle = collapseItem.querySelector('.collapse__toggle');

  const textOpen = toggle.dataset.textOpen;
  const textClose = toggle.dataset.textClose;

  let hiddenHeight = hidden.scrollHeight;
  let opened = false;

  const animationDuration = calculateAnimationDuration(hiddenHeight, HEIGHT_STEP);

  toggle.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.activeElement.blur();

    if (opened) {
      opened = false;
      collapseItem.classList.remove('collapse--opened');
      toggle.innerText = textOpen;
      animateMaxHeight(hidden, hiddenHeight, 0, animationDuration);
    } else {
      opened = true;
      hiddenHeight = hidden.scrollHeight;
      collapseItem.classList.add('collapse--opened');
      toggle.innerText = textClose;
      animateMaxHeight(hidden, 0, hiddenHeight, animationDuration);
    }
  });

  window.addEventListener('resize', () => {
    if (opened) {
      hiddenHeight = hidden.scrollHeight;
      hidden.style.maxHeight = hiddenHeight + 'px';
    }
  });
};


const initCollapse = () => {
  if (!collapseItems.length) {
    return;
  }

  collapseItems.forEach((collapseItem) => {
    setCollapse(collapseItem);
  });
};

export {initCollapse};
