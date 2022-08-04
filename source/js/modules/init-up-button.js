const initUpButton = () => {
  const upButton = document.querySelector('.up-button__inner');
  const innerContent = document.querySelector('.content__inner');
  const header = document.querySelector('.header');

  if (!upButton) {
    return;
  }

  document.addEventListener('scroll', () => {
    const wrapperPosition = innerContent.getBoundingClientRect().top;
    if (wrapperPosition < header.clientHeight) {
      upButton.classList.add('is-active');
    } else {
      upButton.classList.remove('is-active');
    }
  });

};

export {initUpButton};
