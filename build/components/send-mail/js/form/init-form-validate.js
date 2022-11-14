import FormsValidate from './form-validate';
import {sendMail} from './send-mail';
import {baseSendSuccess, baseSendError} from './form-send-callbacks';
const formWrappers = document.querySelectorAll('[data-validate]');
const sendUrl = 'send.php';

const baseValidationSuccessCallback = (evt) => {
  evt.preventDefault();
  const url = evt.target.getAttribute('action') || sendUrl;
  sendMail(url, baseSendSuccess, baseSendError, new FormData(evt.target), evt.target);
};

const baseValidationErrorCallback = (evt) => {
  evt.preventDefault();
};

const customExampleValidationSuccessCallback = (evt) => {
  evt.preventDefault();
  window.clearForm(evt.target);
  // eslint-disable-next-line no-console
  console.log('Ваша форма успешна отправлена');
};

const customExampleValidationErrorCallback = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.error('Отправка формы невозможна, заполните все обязательные поля');
};

const callbacks = {
  base: {
    validationSuccessCallback: baseValidationSuccessCallback,
    validationErrorCallback: baseValidationErrorCallback,
  },
  customExample: {
    validationSuccessCallback: customExampleValidationSuccessCallback,
    validationErrorCallback: customExampleValidationErrorCallback,
  },
};

const setCustomPhoneInputsEvent = () => {
  if (document.querySelectorAll('[data-validate-type="phone"] input').length) {
    document.querySelector('html').addEventListener('input', ({target}) => {
      if (target.closest('[data-validate-type="phone"]')) {
        target.closest('[data-validate-type="phone"]').querySelector('input').dispatchEvent(new Event('input'));
      }
    });
  }
};

const initFormValidate = () => {
  if (formWrappers.length) {
    setCustomPhoneInputsEvent();
    formWrappers.forEach((wrapper) => {
      let callback = wrapper.dataset.callback;

      if (!callback) {
        callback = 'base';
      }

      const formValidate = new FormsValidate(wrapper, callbacks[callback]);
      return formValidate.init();
    });
  }
};

export {initFormValidate};
