const getData = (url, onSuccess, onFail) => {
  fetch(url)
      .then((response) => response.json())
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onFail(err);
      });
};

const sendData = (url, onSuccess, onFail, body) => {
  fetch(url, {
    method: 'POST',
    body,
  })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => {
        onFail();
      });
};

export {getData, sendData};
