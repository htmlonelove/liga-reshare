const defineCurrency = (cb) => {
  const cachedCurrency = window.localStorage.getItem('currency');
  if (cachedCurrency) cb(cachedCurrency);
  fetch('https://segmentstream.com/cdn-cgi/trace')
    .then(response => response.text())
    .then((data) => {
      var location = data.match(/^loc=(.*)$/gm);
      if (!location.length) {
        cb('$')
      }
      location = location[0].split('=').slice(-1)[0];
      var EU_COUNTRIES = [
        'BE',
        'EL',
        'LT',
        'PT',
        'BG',
        'ES',
        'LU',
        'RO',
        'CZ',
        'FR',
        'HU',
        'SI',
        'DK',
        'HR',
        'MT',
        'SK',
        'DE',
        'IT',
        'NL',
        'FI',
        'EE',
        'CY',
        'AT',
        'SE',
        'IE',
        'LV',
        'PL'
      ];
      const normalizedCountry = location.toUpperCase();
      const currency = normalizedCountry === 'GB' && '£' || EU_COUNTRIES.includes(normalizedCountry) && '€' || '$';
      if (window.localStorage && window.localStorage.setItem) {
        window.localStorage.setItem('currency', currency);
      } 
      cb(currency)
    });
}

const replaceCurrency = () => {
  defineCurrency((currency) => {
    document.querySelectorAll('.rate__price-value, .range-value').forEach((div) => {
      Object.keys(div.dataset).forEach((key) => {
        div.dataset[key] = div.dataset[key].replace('$CURRENCY', currency);
      })
    })
    document.querySelectorAll('.dynamic-currency').forEach((el) => {
      el.innerText = el.innerText.replace('$CURRENCY', currency);
      el.style.display = 'inline';
    })
  });
}

export {replaceCurrency};