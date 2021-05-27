import FormsValidate from './form-validate';
const formWrappers = [...document.querySelectorAll('[data-validate]')];

const resetForm = (form) => {
  setTimeout(() => {
    window.clearForm(form);
  }, 1000);
};

const baseSuccessCallback = (e) => {
  e.preventDefault();
  resetForm(e.target);
};

const baseErrorCallback = (e) => {
  e.preventDefault();
};

const customExampleSuccessCallback = (e) => {
  e.preventDefault();
  resetForm(e.target);
  // eslint-disable-next-line no-console
  console.log('Ваша форма успешна отправлена');
};

const customExampleErrorCallback = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.error('Отправка формы невозможна, заполните все обязательные поля');
};

const callbacks = {
  base: {
    successCallback: baseSuccessCallback,
    errorCallback: baseErrorCallback,
  },
  customExample: {
    successCallback: customExampleSuccessCallback,
    errorCallback: customExampleErrorCallback,
  },
};

const initFormValidate = () => {
  if (formWrappers.length) {
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

export default initFormValidate();
