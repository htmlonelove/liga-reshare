const initInputSelect = () => {
  const ENTER_KEY_CODE = 13;
  const inputSelect = document.querySelectorAll('.custom-input--select');
  if (!inputSelect.length) {
    return;
  }

  const tabKeydowns = (event) => {
    return (event.shiftKey && event.keyCode === 9) || (!event.shiftKey && event.keyCode === 9);
  };

  const customSelectsInputs = document.querySelectorAll('.custom-input__wrapper input');
  const customSelectsItems = document.querySelectorAll('.custom-input__select-item');

  const closeAllLists = () => {
    inputSelect.forEach((el) => {
      el.classList.remove('custom-input--select-opened');
    });
  };

  const removeAllActiveClass = (items) => {
    items.forEach((el) => {
      el.classList.remove('active');
    });
  };

  const documentClickHandler = (evt) => {
    if (!evt.target.closest('.custom-input__wrapper')) {
      closeAllLists();
      document.removeEventListener('click', documentClickHandler);
    }
  };

  const activeSelects = () => {
    inputSelect.forEach((node) => {
      const inputSelectNode = node.querySelector('.custom-input__wrapper input');
      const inputSelectOptions = node.querySelectorAll('.custom-input__select-item');

      inputSelectNode.addEventListener('keydown', (evt) => {
        if (tabKeydowns(evt)) {
          setTimeout(() => {
            if (!document.activeElement.classList.contains('custom-input__select-item')) {
              closeAllLists();
            }
          }, 10);
        }
      });

      inputSelectOptions.forEach((el) => {
        el.addEventListener('keydown', (evt) => {
          if (tabKeydowns(evt)) {
            // eslint-disable-next-line max-nested-callbacks
            setTimeout(() => {
              if (!document.activeElement.classList.contains('custom-input__select-item') && document.activeElement !== inputSelectNode) {
                closeAllLists();
              }
            }, 10);
          }
        });
      });
    });

    customSelectsItems.forEach((el) => {
      const optionsHandler = () => {
        el.classList.add('active');
        const parent = el.closest('.custom-input--select');
        const input = parent.querySelector('input');
        input.value = el.innerText;
        closeAllLists();
        removeAllActiveClass(el);
        const changeEv = new CustomEvent('change');
        const inputEv = new CustomEvent('input');
        input.dispatchEvent(changeEv);
        input.dispatchEvent(inputEv);
        const form = el.closest('form');
        if (form) {
          const formChangeEv = new CustomEvent('change');
          const formInputEv = new CustomEvent('input');
          form.dispatchEvent(formChangeEv);
          form.dispatchEvent(formInputEv);
        }
      };

      el.addEventListener('click', optionsHandler);

      el.addEventListener('keydown', (evt) => {
        if (evt.keyCode === ENTER_KEY_CODE) {
          optionsHandler();
        }
      });
    });

    const showListOnClick = (evt) => {
      evt.preventDefault();
      document.addEventListener('click', documentClickHandler);
      if (evt.target.closest('.custom-input--select').classList.contains('custom-input--select-opened')) {
        closeAllLists();
      } else {
        evt.target.closest('.custom-input--select').classList.add('custom-input--select-opened');
      }
    };

    const showListOnKeydown = (evt) => {
      document.addEventListener('click', documentClickHandler);
      if (evt.keyCode === ENTER_KEY_CODE) {
        evt.preventDefault();
        if (evt.target.parentNode.classList.contains('custom-input--select-opened')) {
          closeAllLists();
        } else {
          evt.target.parentNode.classList.add('custom-input--select-opened');
        }
      }
    };

    customSelectsInputs.forEach((input) => {
      input.addEventListener('click', showListOnClick);
      input.addEventListener('keydown', showListOnKeydown);
    });
  };

  activeSelects();
};

export {initInputSelect};
