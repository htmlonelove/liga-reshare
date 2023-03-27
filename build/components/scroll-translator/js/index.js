import {ScrollTranslator} from './scroll-translator';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const scrollTranslator = new ScrollTranslator();
    scrollTranslator.init();
  });
});
