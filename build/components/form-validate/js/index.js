import {CustomSelect} from './select/custom-select';
import {Form} from './form-validate/form';
import {uploadFile, uploadImageDrop} from './input-file/init-upload';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    uploadFile();
    uploadImageDrop();
    const select = new CustomSelect();
    select.init();
    const form = new Form();
    window.form = form;
    form.init();
  });
});
