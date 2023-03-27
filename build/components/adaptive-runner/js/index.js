import {AdaptiveRunner} from './adaptive-runner';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const adaptiveRunner = new AdaptiveRunner();
    adaptiveRunner.init();
  });
});
