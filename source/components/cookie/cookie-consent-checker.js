import {Cookie} from 'Cookie';

const cookieNode = document.querySelector('.cookie');

const cookieConsentChecker = () => {
  if (!cookieNode) {
    return;
  }

  const consentCookie = new Cookie('has_cookie_consent');

  if (!consentCookie.get('has_cookie_consent')) {
    const cookieCloseBtn = cookieNode.querySelector('.cookie__close-btn');

    cookieNode.classList.add('cookie--active');

    cookieCloseBtn.addEventListener('click', (evt) => {
      evt.preventDefault();

      const cookieDuration = +cookieNode.dataset.duration;

      cookieNode.classList.remove('cookie--active');

      if (cookieDuration) {
        consentCookie.set('has_cookie_consent', 'yes', cookieDuration);
      } else {
        consentCookie.set('has_cookie_consent', 'yes', 30);
      }
    });
  }
};

export {cookieConsentChecker};
