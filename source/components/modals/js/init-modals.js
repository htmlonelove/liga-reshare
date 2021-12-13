import {Modals} from './modals';

let modals;

const settings = {
  'default': {
    preventDefault: true,
    stopPlay: true,
    lockFocus: true,
    startFocus: true,
    focusBack: true,
    eventTimeout: 400,
    openCallback: false,
    closeCallback: false,
  },
  // modal-1 добавлен исключительно для примера при добавлении на проект ключ и обект записанный в нём нужно удалить
  'modal-1': {
    openCallback: () => console.log('Я отработаю при открытии modal-1'),
    closeCallback: () => console.log('Я отработаю при закрытии modal-1'),
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
