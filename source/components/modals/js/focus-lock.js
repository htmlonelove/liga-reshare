const SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
];

export class FocusLock {
  constructor() {
    this._lockedElement = null;
    this._startElement = null;
    this._focusableElements = null;
    this._endElement = null;
    this._selectors = SELECTORS;

    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
  }

  _documentKeydownHandler(evt) {
    const activeElement = document.activeElement;
    if (!this._focusableElements.length) {
      if (evt.key === 'Tab' && !evt.shiftKey) {
        evt.preventDefault();
      }
      if (evt.key === 'Tab' && evt.shiftKey) {
        evt.preventDefault();
      }
      return;
    }


    if (this._focusableElements.length === 1) {
      if (evt.key === 'Tab' && !evt.shiftKey) {
        evt.preventDefault();
        this._focusableElements[0].focus();
      }

      if (evt.key === 'Tab' && evt.shiftKey) {
        evt.preventDefault();
        this._focusableElements[0].focus();
      }
      return;
    }


    if (evt.key === 'Tab' && !evt.shiftKey && activeElement === this._focusableElements[this._focusableElements.length - 1]) {
      evt.preventDefault();
      this._focusableElements[0].focus();
    }

    if (evt.key === 'Tab' && evt.shiftKey && activeElement === this._focusableElements[0]) {
      evt.preventDefault();
      this._focusableElements[this._focusableElements.length - 1].focus();
    }
  }

  lock(lockedClass, startElement) {
    this._lockedElement = document.querySelector(lockedClass);
    this._focusableElements = this._lockedElement.querySelectorAll(this._selectors);
    this._endElement = document.activeElement;
    this._startElement = startElement || this._lockedElement.querySelector('[data-focus]') || this._focusableElements[0] || false;
    this._endElement.blur();
    if (this._startElement) {
      this._startElement.focus();
    }
    document.addEventListener('keydown', this._documentKeydownHandler);
  }

  unlock() {
    if (this._endElement) {
      this._endElement.focus();
    }
    this._lockedElement = null;
    this._startElement = null;
    this._focusableElements = null;
    this._endElement = null;
    document.removeEventListener('keydown', this._documentKeydownHandler);
  }
}
