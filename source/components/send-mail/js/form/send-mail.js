export const sendMail = (url, onSuccess, onError, data, target) => {
  fetch(url,
      {
        method: 'POST',
        body: data,
      })
      .then((response) => {
        if (response.ok) {
          onSuccess(target);
          return;
        }
        throw new Error();
      })
      .catch((err) =>{
        onError(err, target);
      });
};
