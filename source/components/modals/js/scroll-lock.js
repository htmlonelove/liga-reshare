export class ScrollLock {
  constructor() {
    this._scrollTop = null;
    this._isBlocked = false;
  }

  _getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  _getBodyScrollTop() {
    return (
      self.pageYOffset ||
      (document.documentElement && document.documentElement.ScrollTop) ||
      (document.body && document.body.scrollTop)
    );
  }

  disableScrolling() {
    this._scrollTop = document.body.dataset.scroll = document.body.dataset.scroll ? document.body.dataset.scroll : this._getBodyScrollTop();
    if (!this._isBlocked) {
      document.body.style.paddingRight = `${this._getScrollbarWidth()}px`;
    }
    document.body.style.top = `-${this._scrollTop}px`;
    document.body.classList.add('scroll-lock');
    this._isBlocked = true;
  }

  enableScrolling() {
    document.body.classList.remove('scroll-lock');
    window.scrollTo(0, +document.body.dataset.scroll);
    document.body.removeAttribute('data-scroll');
    document.body.style.paddingRight = null;
    this._isBlocked = false;
  }
}

window.scrollLock = new ScrollLock();
