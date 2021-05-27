const textarea = document.querySelectorAll('.autoresize-textarea textarea');

const getHeightWithoutBorder = (el) => {
  let realscrollHeight = el.scrollHeight;

  if (!el.value) {
    el.value = 0;
    realscrollHeight = el.scrollHeight;
    el.value = '';
  }

  return realscrollHeight + el.offsetHeight - el.clientHeight;
};

const resizeHeight = (el) => {
  el.style.height = 'auto';
  el.style.height = `${getHeightWithoutBorder(el)}px`;
};

const initAutoResizeTextarea = () => { // ВЫНЕСТИ В ВИНДОВ
  if (!textarea.length) {
    return;
  }

  textarea.forEach((el) => {
    el.classList.add('.is-initialized');
    el.style.overflow = 'hidden';
    el.style.resize = 'none';
    resizeHeight(el);

    el.addEventListener('input', () => {
      resizeHeight(el);
    });

    const form = el.closest('form');

    if (form) {
      form.addEventListener('submit', () => {
        resizeHeight(el);
      });
    }
  });

  window.addEventListener('resize', () => {
    textarea.forEach((el) => {
      resizeHeight(el);
    });
  });
};

export {initAutoResizeTextarea, resizeHeight};
