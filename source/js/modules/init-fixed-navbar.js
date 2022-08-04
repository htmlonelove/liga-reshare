const breakpointMd = window.matchMedia('(min-width:1024px)');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const contentWrapper = document.querySelector('.content__wrapper');

const getNavbarPosition = () => {
  if (!navbar) {
    return;
  }

  const windowHeight = document.documentElement.clientHeight;

  const headerPosition = header.getBoundingClientRect().bottom;
  const contentWrapperPosition = contentWrapper.getBoundingClientRect().top;
  const footerPosition = footer.getBoundingClientRect().y;
  const footerHeightVisible = windowHeight - footerPosition;
  if (breakpointMd.matches) {
    if (headerPosition >= contentWrapperPosition) {
      navbar.style.position = 'fixed';
      navbar.style.top = `${header.offsetHeight}px`;
      navbar.style.left = 'auto';
      navbar.style.height = 'auto';
      if (footerHeightVisible >= 0) {
        // navbar.style.bottom = '0';
        navbar.style.bottom = `${footerHeightVisible}px`;
        // navbar.style.transform = `translate3d(0, -${footerHeightVisible}px, 0)`;
      } else {
        navbar.style.bottom = '0';
        // navbar.style.transform = 'translate3d(0, 0, 0)';
      }
    } else {
      navbar.style.position = 'absolute';
      navbar.style.top = '0';
    }
  } else {
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
  }
};

const initFixedNavbar = () => {
  getNavbarPosition();
  document.addEventListener('scroll', getNavbarPosition);
  window.addEventListener('resize', getNavbarPosition);
};

export {initFixedNavbar};
