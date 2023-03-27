import './move-to';
import {NavigationChanger} from './navigation-changer';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const navigationChanger = new NavigationChanger();
    navigationChanger.init();
  });
});
