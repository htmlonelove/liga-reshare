const locomotiveContainer = document.querySelector('[data-scroll-container]');

const initLocomotive = () => {
  const options = {
    el: locomotiveContainer,
    smooth: true,
    getDirection: true,
    multiplier: 0.7,
    touchMultiplier: 5,
    lerp: 0.1,
    mobile: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  };

  window.ls = new window.LocomotiveScroll(options);

  window.addEventListener('resize', () => {
    setTimeout(() => {
      window.ls.update();
    }, 500);
  });
};

export const initLocomotiveScroll = () => {
  if (!locomotiveContainer) {
    return;
  }
  initLocomotive();
};
