export class DynamicAdaptive {
  constructor(type) {
    this.type = type;
    this._baseWindowWidth = '767';
  }

  init() {
    // массив объектов
    this._objectsArray = [];
    this._daClassName = 'dynamic-adaptive';
    // массив DOM-элементов
    this._nodes = document.querySelectorAll('[data-da]');

    // наполнение objects объектами
    this._nodes.forEach((node) => {
      const data = node.dataset.da.trim();
      const dataArray = data.split(',');
      const object = {};
      object.element = node;
      object.parent = node.parentNode;
      object.destination = document.querySelector(dataArray[0].trim());
      object.breakpoint = dataArray[1] ? dataArray[1].trim() : this._baseWindowWidth;
      object.place = dataArray[2] ? dataArray[2].trim() : 'last';
      object.index = this._indexInParent(object.parent, object.element);
      this._objectsArray.push(object);
    });

    this._arraySort();

    // массив уникальных медиа-запросов
    this._mediaQueries = this._objectsArray.map((item) => {
      return `(${this.type}-width: ${item.breakpoint}px),${item.breakpoint}`;
    });
    this._mediaQueries = this._mediaQueries.filter((item, index) => {
      return this._mediaQueries.indexOf(item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    this._mediaQueries.forEach((media) => {
      const mediaSplit = String(media).split(',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const objectsFilter = this._objectsArray.filter((item) => {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(() => {
        this._mediaHandler(matchMedia, objectsFilter);
      });
      this._mediaHandler(matchMedia, objectsFilter);
    });
  }

  _mediaHandler(matchMedia, objects) {
    if (matchMedia.matches) {
      objects.forEach((object) => {
        object.index = this._indexInParent(object.parent, object.element);
        this._moveTo(object.place, object.element, object.destination);
      });
      return;
    }
    objects.forEach((object) => {
      if (object.element.classList.contains(this._daClassName)) {
        this._moveBack(object.parent, object.element, object.index);
      }
    });
  }

  // Функция перемещения
  _moveTo(place, element, destination) {
    element.classList.add(this._daClassName);
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element);
      return;
    }
    if (place === 'first') {
      destination.prepend(element);
      return;
    }
    destination.children[place].before(element);
  }

  // Функция возврата
  _moveBack(parent, element, index) {
    element.classList.remove(this._daClassName);
    if (parent.children[index]) {
      parent.children[index].before(element);
      return;
    }
    parent.append(element);
  }

  // Функция получения индекса внутри родителя
  _indexInParent(parent, element) {
    const array = Array.from(parent.children).slice();
    return array.indexOf(element);
  }

  // Функция сортировки массива по breakpoint и place
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  _arraySort() {
    if (this.type === 'min') {
      this._objectsArray.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }

          if (a.place === 'last' || b.place === 'first') {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    }
    if (this.type === 'max') {
      this._objectsArray.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === 'first' || b.place === 'last') {
            return 1;
          }

          if (a.place === 'last' || b.place === 'first') {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
    }
  }
}
