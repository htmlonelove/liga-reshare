const getElTop = (el) => {
  return el.getBoundingClientRect().top + window.pageYOffset;
};

export {getElTop};
