const initMainPadding = () => {
  const main = document.querySelector('main');
  const headerObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const headerHeight = entry.borderBoxSize[0].blockSize;
      main.style.paddingTop = `${headerHeight}px`;
    }
  });
  headerObserver.observe(document.querySelector('.header'));
};

export {initMainPadding};
