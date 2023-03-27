import {SimpleCursor} from './simple-cursor';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const simpleCursor = new SimpleCursor();
    simpleCursor.init();
  });
});
