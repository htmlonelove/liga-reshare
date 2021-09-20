import {Modals} from './modals';

let modals;

// Сдесь реализован пример открытия модалки через колбэк закрытия
// const openModalInCloseCallback = (name, context) => {
//   context._enableScrolling = false;
//   context._setSettings('default');
//   modals.open(name);
// };

// closeCallback() {
//   openModalInCloseCallback('modal-5', this);
// },

const settings = {
  'default': {
    preventDefault: true,
    stopPlay: true,
    lockFocus: true,
    eventTimeout: 600,
    enableScrollTimeout: 500,
    openCallback: false,
    closeCallback: false,
  },
  // modal-1 добавлен исключительно для примера при добавлении на проект ключь и обект записанный в нём нужно удалить
  'modal-1': {
    openCallback: () => console.log('Я отработаю при открытии example-1'),
    closeCallback: () => console.log('Я отработаю при закрытии example-1'),
  },
};

const initModals = () => {
  const modalElements = document.querySelectorAll('.modal');
  if (modalElements.length) {
    modalElements.forEach((el) => {
      setTimeout(() => {
        el.classList.remove('modal--preload');
      }, 100);
    });
  }

  modals = new Modals(settings);
  // Используйте в разработке экспортируемую переменную modals, window сделан для бэкэнда
  window.modals = modals;
};

export {modals, initModals};
