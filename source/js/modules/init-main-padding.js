const initMainPadding = () => {
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  main.style.paddingTop = `${headerHeight}px`;
};

export {initMainPadding};
