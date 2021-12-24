export class StateChanger {
  constructor(parent) {
    this._changeParent = parent;
    this._breakpoint = parent.dataset.stopBreakpoint ? parent.dataset.stopBreakpoint : null;

    this._settings = {
      opacity: {
        property: 'opacity',
        farState: '0',
        changeState: (position, coefficient, amendment) => {
          return 1 - Math.abs(position / coefficient) * amendment;
        },
      },
      filterGrayscale: {
        property: 'filter',
        farState: 'grayscale(1)',
        changeState: (position, coefficient, amendment) => {
          return `grayscale(${Math.abs(position / coefficient) * amendment})`;
        },
      },
    };
  }

  blocksAnimation() {
    this.opacityBlocks.forEach((block) => {
      const startPosition = Boolean(block.getBoundingClientRect().top - window.innerHeight < 0);
      const stopPosition = Boolean(block.getBoundingClientRect().bottom < 0);
      const property = block.Boolean
      const position = (window.innerHeight - block.getBoundingClientRect().height) / 2 - block.getBoundingClientRect().top;
      const coefficient = (window.innerHeight - block.getBoundingClientRect().height / 2);
      if (startPosition && !stopPosition) {
        block.style.opacity = `${1 - Math.abs(position / coefficient) * 1.5}`;
      } else {
        block.style.opacity = '0';
      }
    });
  }
}
