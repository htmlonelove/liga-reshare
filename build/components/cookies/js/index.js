import {cookieConsentChecker} from './cookie-consent-checker';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    cookieConsentChecker();
  });
});
