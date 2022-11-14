export class ScrollTranslator {
  constructor() {
    this._translatorElements = document.querySelectorAll('[data-translator="parent"]');

    this._windowScrollHandler = this._windowScrollHandler.bind(this);
    this._windowResizeHandler = this._windowResizeHandler.bind(this);
  }

  init() {
    if (!this._translatorElements.length) {
      return;
    }

    this._setTranslatorsState();
    window.addEventListener('scroll', this._windowScrollHandler);
    window.addEventListener('resize', this._windowResizeHandler);
  }

  _windowScrollHandler() {
    this._setTranslatorsState();
  }

  _windowResizeHandler() {
    this._setTranslatorsState();
  }

  _setTranslatorsState() {
    this._translatorElements.forEach((element) => {
      if (window.getComputedStyle(element, null).getPropertyValue('display') === 'none') {
        return;
      }
      const indicator = element.querySelector('[data-translator="indicator"]');
      const type = element.dataset.translatorType;
      this._setTranslatorState(indicator, type);
    });
  }

  _setTranslatorState(indicator, type) {
    const shift = Math.abs(document.body.getBoundingClientRect().top / (document.body.scrollHeight - window.innerHeight));

    if (type === 'horizontal') {
      indicator.style.transform = `scaleX(${shift})`;
    }

    if (type === 'vertical') {
      indicator.style.transform = `scaleY(${shift})`;
    }
  }
}
