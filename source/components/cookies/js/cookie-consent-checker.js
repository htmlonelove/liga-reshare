import {Cookie} from './cookie';

const BASE_DURATION = 30;
const cookieElement = document.querySelector('[data-cookies]');

export const cookieConsentChecker = () => {
  if (!cookieElement) {
    return;
  }

  const consentCookie = new Cookie('has_cookie_consent');

  if (!consentCookie.get('has_cookie_consent')) {
    const cookieBtnElement = cookieElement.querySelector('[data-cookies-consent]');
    cookieElement.classList.add('is-active');
    cookieBtnElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      const cookieDuration = +cookieElement.dataset.cookiesDuration || BASE_DURATION;
      cookieElement.classList.remove('is-active');
      consentCookie.set('has_cookie_consent', 'yes', cookieDuration);
    });
  }
};
