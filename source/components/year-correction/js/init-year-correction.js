export const initYearCorrection = () => {
  const today = new Date();
  document.querySelectorAll('[data-year]').forEach((item) => {
    item.innerHTML = today.getFullYear();
  });
};
