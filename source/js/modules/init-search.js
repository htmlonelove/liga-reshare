const initSearch = () => {
  const searchInput = document.querySelector('.search__input');
  const searchWrapper = document.querySelector('.search__wrapper');
  const searchList = document.querySelector('.search__list');
  const searchNote = document.querySelector('.search__note');
  const pathData = '../data/dataSearch.json';
  const elementsArr = [];

  function findMatches(wordToMatch, elements) {
    return elements.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.title.match(regex) || place.tag.match(regex);
    });
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, elementsArr);
    const html = matchArray.map((element) => {
      const regex = new RegExp(this.value, 'gi');
      const resultTitle = element.title.replace(regex, `<span class="search__hl">${this.value}</span>`);
      const resultTag = element.tag.replace(regex, `<span class="search__hl">${this.value}</span>`);
      return `
        <li class="search__item">
            <a class="search__link" href="${element.link}">
                <span class="search__text">${resultTitle}</span>
                <span class="search__text">${resultTag}</span>
            </a>
        <li>
      `;
    }).join('');

    searchList.innerHTML = this.value ? html : '';

    searchNote.textContent = matchArray.length ? '' : 'Упс... Ни чего не найдено';

    searchNote.style.dysplay = matchArray.length ? 'none' : 'block';

    if (this.value === '') {
      searchNote.textContent = 'Введите ваш запрос';
    }
  }

  const getFetchData = (path) => {
    return fetch(path)
        .then((res) => res.json())
        .then((data) => {
          elementsArr.push(...data);
        });
  };

  searchInput.addEventListener('input', displayMatches);

  document.addEventListener('click', (evt) => {
    const target = evt.target;
    if (searchWrapper.classList.contains('is-active')) {
      if (!target.closest('.search')) {
        searchWrapper.classList.remove('is-active');
      }
    }
  });

  getFetchData(pathData);
};

export {initSearch};
