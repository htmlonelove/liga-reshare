export class SimpleCursor {
  constructor() {
    this._cursor = document.querySelector('[data-cursor]');

    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerLeave = this._onPointerLeave.bind(this);
  }

  _onPointerLeave() {
    this._cursor.classList.add('is-hidden');
  }

  _onPointerMove(evt) {
    if (evt.pointerType === 'touch' || evt.target.closest('a') || evt.target.closest('button') || evt.target.closest('label') || evt.target.closest('input') || evt.target.closest('textarea') || evt.target.closest('select') || evt.target.closest('.no-cursor') || evt.target.closest('iframe') || evt.target.closest('.blob-link')) {
      this._cursor.classList.add('is-hidden');
      return;
    }

    if (this._cursor.classList.contains('is-hidden')) {
      this._cursor.classList.remove('is-hidden');
    }

    requestAnimationFrame(() => {
      this._cursor.style.transform = `translate3D(${evt.clientX}px, ${evt.clientY}px, 0)`;
    });
  }

  init() {
    if (!this._cursor) {
      return;
    }

    document.body.addEventListener('pointermove', this._onPointerMove);
    document.body.addEventListener('pointerleave', this._onPointerLeave);
  }
}
