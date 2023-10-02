// 1 Вариант - на классах
class PageLoader {
  constructor() {
    this.container = document.querySelector('[data-page-loader]');
    if (!this.container) {
      return;
    }

    this.event = new Event('loaderOff'); // создаем ивент, который будет вызываться по снятию лоадера

    this.off = this.off.bind(this);

    this.init();
  }

  off() {
    window.scrollLock.disablePageScroll(); // заблокировать скролл

    // востановление позиции скролла
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    this.container.classList.add('is-hidden'); // прячем лоадер
    window.dispatchEvent(this.event); // вызываем событие снятия прелоадера
  }

  init() {
    window.scrollLock.enablePageScroll(); // разблокировать скролл
    window.addEventListener('load', this.off); // после загрузки страницы вызови метод off
  }
}

const initPageLoader = () => new PageLoader();

window.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
});

window.addEventListener('loaderOff', () => {
  // тут js, который нужно вызывать ПОСЛЕ снятия лоадера
  // не всегда это нужно, но важно знать
  console.log('page loaded and loader off');
});
