export const baseSendSuccess = (target) => {
  window.clearForm(target);
  // eslint-disable-next-line no-console
  console.log('Ваша форма успешна отправлена');
};

export const baseSendError = () => {
  // eslint-disable-next-line no-console
  console.error('Произошла ошибка отправки');
};
