const initHeaderObserver = () => {
  const main = document.querySelector('main');
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }
  const headerObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const cr = entry.contentRect;
    }
    if (header.clientHeight > 80) {
      main.style.paddingTop = `${header.clientHeight}px`;
    }
  });
  headerObserver.observe(header);
};

export {initHeaderObserver};
