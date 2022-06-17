const initStickyNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const headerObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const headerHeight = entry.borderBoxSize[0].blockSize;
      navbar.style.top = `${headerHeight}px`;
    }
  });
  headerObserver.observe(document.querySelector('.header'));
};

export {initStickyNavbar};
