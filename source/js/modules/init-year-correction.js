export const initYearCorrection = () => {
  const dateItems = document.querySelectorAll('[data-year]');
  const today = new Date();
  dateItems.forEach((item) => {
    item.innerHTML = today.getFullYear();
  });
};
