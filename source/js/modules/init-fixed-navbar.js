const initFixedNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const contentWrapper = document.querySelector('.content__wrapper');

  if (!navbar) {
    return;
  }

  const windowHeight = document.documentElement.clientHeight;

  document.addEventListener('scroll', () => {
    const headerPosition = header.getBoundingClientRect().bottom;
    const contentWrapperPosition = contentWrapper.getBoundingClientRect().top;
    const footerPosition = footer.getBoundingClientRect().y;
    const footerHeightVisible = windowHeight - footerPosition;
    if (headerPosition >= contentWrapperPosition) {
      navbar.style.position = 'fixed';
      navbar.style.top = `${header.offsetHeight}px`;
      navbar.style.left = 'auto';
      navbar.style.height = 'auto';
      if (footerHeightVisible >= 0) {
        navbar.style.bottom = `${footerHeightVisible}px`;
      } else {
        navbar.style.bottom = '0';
      }
    } else {
      navbar.style.position = 'absolute';
      navbar.style.top = '0';
      navbar.style.left = '0';
      navbar.style.bottom = '0';
    }
  });
};

export {initFixedNavbar};
