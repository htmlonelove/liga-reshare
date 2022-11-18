const initSearch = () => {
  const searchInput = document.querySelector('.search__input');
  const pathData = '../data/dataSearch.json';
  const elementsArr = [];

  function findMatches(wordToMatch, elements) {
    return elements.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.title.match(regex) || place.description.match(regex);
    });
  }

  function displayMatches() {
    console.log(this.value);
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);

  const getFetchData = (path) => {
    return fetch(path)
        .then((res) => res.json())
        .then((data) => {
          elementsArr.push(...data);
        });
  };

  getFetchData(pathData);
};

export {initSearch};
