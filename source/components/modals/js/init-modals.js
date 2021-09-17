import {Modals} from './modals';

let modals;

const settings = {
  'default': {
    preventDefault: true,
    stopPlay: true,
    lockFocus: true,
    disableScrolling: true,
    enableScrolling: true,
    openTimeout: 0,
    enableScrollTimeout: 500,
    openCallback: false,
    closeCallback: false,
  },
  // modal-3 добавлен исключительно для примера при добавлении на проект ключь и обект записанный в нём нужно удалить
  'modal-3': {
    openCallback: () => console.log('Я отработаю при открытии example-3'),
    closeCallback: () => modals.open('modal-5'),
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
