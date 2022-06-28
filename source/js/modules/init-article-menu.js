const initArticleMenu = () => {
  const articleButton = document.querySelector('.article-menu__button');
  const articleButtonWrapper = document.querySelector('.article-menu__button-wrapper');
  const articleList = document.querySelector('.article-menu__list');
  const articleLinks = document.querySelectorAll('.article-menu__link');
  const articlePoint = document.querySelector('.article-menu__point');
  const articleMenu = document.querySelector('.article-menu');

  if (!articleButton) {
    return;
  }

  const getStickyText = () => {
    const activeLink = document.querySelector('.article-menu__link.is-active');
    if (activeLink) {
      articlePoint.textContent = activeLink.textContent;
    }
  };

  const getStickyWidth = () => {
    const pointStickyWidth = parseInt(getComputedStyle(articlePoint).width, 10);
    if (articlePoint.scrollWidth >= pointStickyWidth) {
      articlePoint.classList.add('is-long');
    } else {
      articlePoint.classList.remove('is-long');
    }
    articleLinks.forEach((item) => {
      if (item.scrollWidth >= pointStickyWidth) {
        item.classList.add('is-long');
      }
    });
  };

  const openMenu = () => {
    articleList.classList.add('is-active');
    articlePoint.classList.add('is-inactive');
    articleButton.classList.add('is-active');
    articleButtonWrapper.classList.add('is-inactive');
  };

  const closeMenu = () => {
    articleList.classList.remove('is-active');
    articlePoint.classList.remove('is-inactive');
    articleButton.classList.remove('is-active');
    articleButtonWrapper.classList.remove('is-inactive');
  };

  const getStickPosition = () => {
    const hero = document.querySelector('.hero');
    const heroPosition = hero.getBoundingClientRect().bottom;
    if (heroPosition <= 0) {
      articleMenu.classList.add('show');
    } else {
      articleMenu.classList.remove('show');
    }
  };

  getStickPosition();

  getStickyText();
  getStickyWidth();

  window.addEventListener('resize', () => {
    setTimeout(() => {
      getStickyWidth();
    }, 0);
  });

  document.addEventListener('scroll', () => {
    getStickyText();
    getStickyWidth();
    getStickPosition();
    setTimeout(() => {
      getStickyText();
      getStickyWidth();
      getStickPosition();
    }, 100);
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    // Toggle по кнопке
    if (target.closest('.article-menu__button-wrapper') || target.closest('.article-menu__link')) {
      if (articleButton.classList.contains('is-active')) {
        closeMenu();
      } else {
        openMenu();
      }
    }
    // Close по документу
    if (articleButton.classList.contains('is-active') && !e.target.closest('.article-menu')) {
      closeMenu();
    }
  });
};

export {initArticleMenu};
