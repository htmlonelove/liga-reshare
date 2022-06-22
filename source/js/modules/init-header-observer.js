const breakpointMd = window.matchMedia('(min-width:1024px)');

const initHeaderObserver = () => {
  const main = document.querySelector('main');
  const navbar = document.querySelector('.navbar');
  const headerObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const headerHeight = entry.borderBoxSize[0].blockSize;
      main.style.paddingTop = `${headerHeight}px`;

      if (navbar) {
        if (breakpointMd.matches) {
          navbar.style.top = `${headerHeight}px`;
        } else {
          navbar.style.top = '0';
        }
      }

    }
  });
  headerObserver.observe(document.querySelector('.header'));
};

export {initHeaderObserver};
