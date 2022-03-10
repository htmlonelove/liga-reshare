import {CustomSelect} from './custom-select';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const customSelect = new CustomSelect();
    customSelect.init();
  });
});
