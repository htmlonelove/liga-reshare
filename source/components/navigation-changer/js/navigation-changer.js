export class NavigationChanger {
  constructor() {
    this._moveTo = new window.MoveTo({
      duration: 1000,
      easing: 'easeOutQuart',
    });
    this._blockShift = 50;
    this._linkElements = document.querySelectorAll('[data-navigation-link]');
    this._documentScrollHandler = this._documentScrollHandler.bind(this);
  }

  init() {
    if (!this._linkElements.length) {
      return;
    }
    this._initMoveTo();
    this._changeLinksActiveState();
    document.addEventListener('scroll', this._documentScrollHandler);
  }

  _documentScrollHandler() {
    this._changeLinksActiveState();
  }

  _changeLinksActiveState() {
    this._linkElements.forEach((link, index) => {
      const currentBlockElement = document.querySelector(`${link.getAttribute('href')}`);
      if (currentBlockElement.getBoundingClientRect().bottom > this._blockShift && currentBlockElement.getBoundingClientRect().top <= this._blockShift) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }

      if (document.body.getBoundingClientRect().bottom - window.innerHeight < this._blockShift && currentBlockElement.getBoundingClientRect().top > this._blockShift) {
        this._linkElements[index - 1].classList.remove('is-active');
        link.classList.add('is-active');
      }
    });
  }

  _initMoveTo() {
    this._linkElements.forEach((link) => {
      this._moveTo.registerTrigger(link);
      document.activeElement.blur();
    });
  }
}
