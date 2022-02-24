const textAreas = document.querySelectorAll('.auto-resize-textarea textarea');

const getHeightWithoutBorder = (el) => {
  let realScrollHeight = el.scrollHeight;

  if (!el.value) {
    el.value = 0;
    realScrollHeight = el.scrollHeight;
    el.value = '';
  }

  return realScrollHeight + el.offsetHeight - el.clientHeight;
};

const resizeHeight = (el) => {
  el.style.height = 'auto';
  el.style.height = `${getHeightWithoutBorder(el)}px`;
};

const initAutoResizeTextarea = () => { // ВЫНЕСТИ В ВИНДОВ
  if (!textAreas.length) {
    return;
  }

  textAreas.forEach((el) => {
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
    textAreas.forEach((el) => {
      resizeHeight(el);
    });
  });
};

export {initAutoResizeTextarea, resizeHeight};
