const breakpointMd = window.matchMedia('(min-width:1024px)');
const headerLogo = document.querySelector('[data-header-logo]');
const sandwich = document.querySelector('[data-sandwich]');
const nav = document.querySelector('[data-main-nav]');
const gitLink = document.querySelector('.header__git-link');

const removeTransition = (el) => {
  el.classList.add('no-transition');
  setTimeout(() => {
    el.classList.remove('no-transition');
  }, 300);
};

const openMenu = () => {
  const navItem = nav.querySelectorAll('[data-nav-item]');
  window.scrollLock.disablePageScroll();
  sandwich.classList.add('is-active');
  sandwich.ariaPressed = 'true';
  nav.classList.add('is-active');
  gitLink.classList.add('is-active');
  headerLogo.classList.add('is-active');
  navItem.forEach((item, index) => {
    item.style.transitionDelay = `${0.2 + index * 0.1}s`;

    setTimeout(() => {
      item.style.transitionDelay = '';
    }, 0.15 + 0.2 + index * 1000);
  });
};

const closeMenu = (unlock) => {
  const navItem = nav.querySelectorAll('[data-nav-item]');
  if (unlock) {
    window.scrollLock.enablePageScroll();
  }
  sandwich.classList.remove('is-active');
  sandwich.ariaPressed = 'false';
  nav.classList.remove('is-active');
  gitLink.classList.remove('is-active');
  headerLogo.classList.remove('is-active');
  navItem.forEach((item) => {
    item.style.transitionDelay = '';
  });
};

const breakpointChecker = () => {
  if (breakpointMd.matches) {
    if (nav.classList.contains('is-active')) {
      closeMenu(true);
    }
  } else {
    removeTransition(nav);
  }
  breakpointMd.addListener(breakpointChecker);
};

const initSandwichMenu = () => {
  if (sandwich) {
    sandwich.addEventListener('click', () => {
      if (sandwich.ariaPressed === 'true') {
        closeMenu(true);
      } else {
        openMenu();
      }
    });
    breakpointChecker();
  }
};

export {initSandwichMenu};
