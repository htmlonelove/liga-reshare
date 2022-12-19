import {CustomSelect} from './select/custom-select';
import {Form} from './form-validate/form';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const select = new CustomSelect();
    select.init();
    const form = new Form();
    window.form = form;
    form.init();
  });
});
