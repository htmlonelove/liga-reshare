import {CustomSelect} from './custom-select';
import {initFormValidate} from './init-form-validate';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const select = new CustomSelect();
    select.init();
    initFormValidate();
  });
});
