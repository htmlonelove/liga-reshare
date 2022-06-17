const initUpButton = () => {
  const upButton = document.querySelector('.up-button');
  const buttonWrapper = document.querySelector('.content__inner');
  const header = document.querySelector('.header');

  if (!upButton) {
    return;
  }

  document.addEventListener('scroll', () => {
    const wrapperPosition = buttonWrapper.getBoundingClientRect().top;
    if (wrapperPosition < header.clientHeight) {
      upButton.classList.add('is-active');
    } else {
      upButton.classList.remove('is-active');
    }
  });

};

export {initUpButton};
