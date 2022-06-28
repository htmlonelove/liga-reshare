const breakpointMd = window.matchMedia('(min-width:1024px)');
const navbarButton = document.querySelector('[data-navbar-open]');
const navbarCloseButton = document.querySelector('[data-navbar-close]');
const navbar = document.querySelector('.navbar');
const innerContent = document.querySelector('.content__inner');
const header = document.querySelector('.header');

const openNavbar = () => {
  window.scrollLock.disableScrolling();
  navbar.classList.add('is-active');
};

const closeNavbar = (unlock) => {
  if (unlock) {
    window.scrollLock.enableScrolling();
  }
  navbar.classList.remove('is-active');
};

const breakpointChecker = () => {
  if (breakpointMd.matches) {
    if (navbar.classList.contains('is-active')) {
      closeNavbar(true);
    }
  }
  breakpointMd.addListener(breakpointChecker);
};

const stickyNavbarHandler = () => {
  const wrapperPosition = innerContent.getBoundingClientRect().top;
  if (wrapperPosition < header.clientHeight) {
    navbarButton.classList.add('is-active');
    navbarButton.style.transform = `translate3d(0, ${header.clientHeight}px, 0`;
  } else {
    navbarButton.classList.remove('is-active');
    navbarButton.style.transform = 'translate3d(0, 0, 0';
  }
};

const initNavbarMenu = () => {
  if (navbarButton) {
    navbarButton.addEventListener('click', () => {
      openNavbar();
    });
    navbarCloseButton.addEventListener('click', () => {
      closeNavbar(true);
    });
    document.addEventListener('scroll', stickyNavbarHandler);
    breakpointChecker();
  }
};

export {initNavbarMenu};
