// 2 Вариант - функциональный
function pageLoader() {
  const container = document.querySelector('[data-page-loader]');
  if (!container) {
    return;
  }

  window.scrollLock.disablePageScroll(); // заблокировать скролл
  const event = new Event('loaderOff'); // создаем ивент, который будет вызываться по снятию лоадера

  const off = () => {
    window.scrollLock.enablePageScroll(); // разблокировать скролл

    // востановление позиции скролла
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    container.classList.add('is-hidden'); // прячем лоадер
    window.dispatchEvent(event); // вызываем событие снятия прелоадера
  };

  window.addEventListener('load', off); // после загрузки страницы вызови функцию off
}

const initPageLoader = () => pageLoader();

window.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
});

window.addEventListener('loaderOff', () => {
  // тут js, который нужно вызывать ПОСЛЕ снятия лоадера
  // не всегда это нужно, но важно знать
  console.log('page loaded and loader off');
});
