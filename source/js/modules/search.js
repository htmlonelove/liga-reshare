import {getData} from '../utils/api';

export class Search {
  constructor() {
    this._searchParent = document.querySelector('[data-search]');
    if (!this._searchParent) {
      return;
    }
    this._searchInput = this._searchParent.querySelector('.search__input');
    this._searchWrapper = this._searchParent.querySelector('.search__wrapper');
    this._searchList = this._searchParent.querySelector('.search__list');
    this._searchNote = this._searchParent.querySelector('.search__note');
    this._baseUrl = './data/data-search.json';
    this._url = this._searchParent.dataset.search ? this._searchParent.dataset.search : this._baseUrl;
    this._elementsArr = [];
    this._value = null;

    this._onSuccess = this._onSuccess.bind(this);
    this._onFail = this._onFail.bind(this);
    this._onSearchInputInput = this._onSearchInputInput.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._init();
  }

  _onDocumentClick({target}) {
    if (this._searchWrapper.classList.contains('is-active')) {
      if (!target.closest('.search')) {
        this._searchWrapper.classList.remove('is-active');
      }
    }
  }

  _onSearchInputInput(event) {
    this._displayMatches(event);
  }

  _findMatches(wordToMatch, elements) {
    return elements.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.title.match(regex) || place.tag.match(regex);
    });
  }

  _displayMatches({target}) {
    this._value = target.value;
    const matchArray = this._findMatches(this._value, this._elementsArr);
    const html = matchArray.map((element) => {
      const regex = new RegExp(this._value, 'gi');
      const resultTitle = element.title.replace(regex, `<span class="search__hl">${this._value}</span>`);
      const resultTag = element.tag.replace(regex, `<span class="search__hl">${this._value}</span>`);
      return `
        <li class="search__item">
            <a class="search__link" href="${element.link}">
                <span class="search__text">${resultTitle}</span>
                <span class="search__text">${resultTag}</span>
            </a>
        <li>
      `;
    }).join('');

    this._searchList.innerHTML = this._value ? html : '';

    this._searchNote.textContent = matchArray.length ? '' : 'Упс... Ничего не найдено';

    this._searchNote.style.display = matchArray.length ? 'none' : 'block';

    if (this._value === '') {
      this._searchNote.textContent = 'Введите ваш запрос';
    }
  }

  _onSuccess(data) {
    this._elementsArr.push(...data);
    this._searchInput.addEventListener('input', this._onSearchInputInput);
    document.addEventListener('click', this._onDocumentClick);
  }

  _onFail() {
    // eslint-disable-next-line no-console
    console.error('Произошла ошибка загрузки данных поиска');
  }

  _getData() {
    getData(this._url, this._onSuccess, this._onFail);
  }

  _init() {
    this._getData();
  }
}
