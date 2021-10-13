export class NavigationChanger {
  constructor() {
    this._moveTo = new window.MoveTo({
      duration: 1000,
      easing: 'easeOutQuart',
    });
    this._linkElements = document.querySelectorAll('[data-navigation-link]');

    //this._documentClickHandler = this._documentClickHandler.bind(this);
    this._windowScrollHandler = this._windowScrollHandler.bind(this);
  }

  init() {
    if (!this._linkElements.length) {
      return;
    }
    this._initMoveTo();
    this._changeLinksActiveState();
    //document.addEventListener('click', this._documentClickHandler);
    document.addEventListener('scroll', this._windowScrollHandler);
  }

  _documentClickHandler(evt) {
    if (evt.target.closest('[data-navigation-link')) {
      evt.preventDefault();
      const currentTargetElement = evt.target.closest('[data-navigation-link');
      const activeLinkElement = document.querySelector('[data-navigation-link].is-active');

      if (currentTargetElement === activeLinkElement) {
        return;
      }

      if (!activeLinkElement) {
        currentTargetElement.classList.add('is-active');
        return;
      }

      activeLinkElement.classList.remove('is-active');
      currentTargetElement.classList.add('is-active');
    }
  }

  _windowScrollHandler() {
    this._changeLinksActiveState();
  }

  _removeLinksActiveState() {
    this._linkElements.forEach((link) => {
      link.classList.remove('is-active');
      document.activeElement.blur();
    });
  }

  _changeLinksActiveState() {
    this._linkElements.forEach((link) => {
      const currentBlockElement = document.querySelector(`${link.getAttribute('href')}`);
      if (currentBlockElement.getBoundingClientRect().top <= 0) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
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
