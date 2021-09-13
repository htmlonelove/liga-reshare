export class Tabs {
  constructor(tabs) {
    this._tabs = tabs;
    this._tab = null;
    this._tabContent = null;
    this._dataHeight = null;
    this._tabControls = null;
    this._tabControl = null;
    this._tabElements = null;
    this._delay = null;
    this._activeIndex = 0;
    this._blockHeight = 0;
    this._heights = [];

    this._onControlClick = this._onControlClick.bind(this);

    this.initTabs();
  }

  initTabs() {
    this._tabs.forEach((tab) => {
      this._tab = tab;
      this.initTab();
    });
  }

  _onControlClick(evt, index) {
    evt.preventDefault();

    this._tabControl = evt.target.closest('[data-tabs="control"]');

    console.log(this._tabControl);

    if (this._tabControl.classList.contains('is-active') || this._tab.classList.contains('no-action')) {
      return;
    }

    /*const activeControl = tab.querySelector(':scope > [data-tabs="controls"] [data-tabs="control"].is-active');
    const activeTabElement = tab.querySelector(':scope > [data-tabs="content"] [data-tabs="element"].is-active');
    const currentHeight = contentBlock.scrollHeight;
    const newHeight = tabsElements[index].scrollHeight;

    parent.classList.add('no-action');

    if (activeControl) {
      activeControl.classList.remove('is-active');
    }

    if (activeTabElement) {
      activeTabElement.classList.remove('is-active');
    }

    if (currentHeight > newHeight) {
      setTimeout(() => {
        if (dataHeight !== 'max') {
          contentBlock.style.height = newHeight + 'px';
        }
        control.classList.add('is-active');
        tabsElements[index].classList.add('is-active');
        parent.classList.remove('no-action');
      }, delay);
    } else {
      if (dataHeight !== 'max') {
        contentBlock.style.height = newHeight + 'px';
      }
      setTimeout(() => {
        control.classList.add('is-active');
        tabsElements[index].classList.add('is-active');
        parent.classList.remove('no-action');
      }, delay);
    }*/

  }

  initTab() {
    this._createTabState();
    this._setTabStartState();
    this._tabControls.forEach((control, index) => {
      control.addEventListener('click', (evt) => {
        this._onControlClick(evt, index);
      });
    });
  }

  _createTabState() {
    this._delay = this._tab.dataset.delay ? this._tab.dataset.delay : 0;
    this._dataHeight = this._tab.dataset.height;
    this._tabContent = this._tab.querySelector('[data-tabs="content"]');
    this._tabControls = this._tab.querySelector('[data-tabs="controls"]').querySelectorAll('[data-tabs="control"]');
    this._tabElements = [...this._tab.querySelector('[data-tabs="content"]').querySelectorAll('[data-tabs="element"]')].slice(0, this._tabControls.length);
  }

  _setTabStartState() {
    this._activeIndex = this._returnActiveIndex(this._tab);
    this._returnActiveIndex(this._tab);
    this._tabControls[this._activeIndex].classList.add('is-active');
    this._tabElements[this._activeIndex].classList.add('is-active');
    this._blockHeight = this._dataHeight === 'max' ? this._returnMaxHeight(this._tab) : this._tabElements[this._activeIndex].scrollHeight;
    this._tabContent.style.height = `${this._blockHeight}px`;
  }

  _removeAllActiveClasses() {
    [...this._tabControls, ...this._tabElements].forEach((element) => {
      if (element) {
        element.classList.remove('is-active');
      }
    });
  }

  _returnActiveIndex() {
    let currentIndex = 0;
    let flag = true;
    this._tabControls.forEach((control, index) => {
      if (control.classList.contains('is-active') && flag) {
        currentIndex = index;
        flag = false;
      }
    });
    return currentIndex;
  }

  _returnMaxHeight() {
    this._tabElements.forEach((element) => {
      this._heights.push(element.scrollHeight);
    });
    this._heights.sort();
    return this._heights[this._heights.length - 1];
  }
}

const removeAllActiveClasses = (tab) => {
  const controlElements = tab.querySelectorAll(':scope > [data-tabs="controls"] [data-tabs="control"]');
  const tabElements = tab.querySelectorAll(':scope > [data-tabs="content"] [data-tabs="element"]');
  [...controlElements, ...tabElements].forEach((element) => {
    if (element) {
      element.classList.remove('is-active');
    }
  });
};

const updateTabHeight = (tab, dataHeight, contentBlock) => {
  window.addEventListener('resize', () => {
    if (dataHeight === 'max') {
      contentBlock.style.height = returnMaxHeight(tab) + 'px';
    } else {
      contentBlock.style.height = tab.querySelector(':scope > [data-tabs="content"] [data-tabs="element"].is-active').scrollHeight + 'px';
    }
  });
};

const returnActiveIndex = (tab) => {
  let index = 0;
  let flag = true;
  const controls = tab.querySelectorAll(':scope > [data-tabs="controls"] [data-tabs="control"]');
  controls.forEach((control, i) => {
    if (control.classList.contains('is-active')) {
      if (flag) {
        index = i;
        flag = false;
      }
    }
  });
  return index;
};

const returnMaxHeight = (tab) => {
  const tabsElements = tab.querySelectorAll(':scope > [data-tabs="content"] [data-tabs="element"]');
  let heights = [];
  tabsElements.forEach((element) => {
    heights.push(element.scrollHeight);
  });
  heights.sort();
  return heights[heights.length - 1];
};

const setTabStartState = (tab) => {
  const controls = tab.querySelectorAll(':scope > [data-tabs="controls"] [data-tabs="control"]');
  const tabsElements = tab.querySelectorAll(':scope > [data-tabs="content"] [data-tabs="element"]');
  const contentBlock = tab.querySelector(':scope > [data-tabs="content"]');
  const activeIndex = returnActiveIndex(tab);

  removeAllActiveClasses(tab);
  controls[activeIndex].classList.add('is-active');
  tabsElements[activeIndex].classList.add('is-active');
  tab.classList.add('is-initialized');

  const blockHeight = tab.dataset.height === 'max' ? returnMaxHeight(tab) : tabsElements[activeIndex].scrollHeight;

  contentBlock.style.height = blockHeight + 'px';
};


const initTabAction = (tab) => {
  let delay = tab.dataset.delay;
  if (!delay) {
    tab.classList.add('no-transition');
    delay = 0;
  }
  const contentBlock = tab.querySelector(':scope > [data-tabs="content"]');
  const controls = tab.querySelectorAll(':scope > [data-tabs="controls"] [data-tabs="control"]');
  const tabsElements = tab.querySelectorAll(':scope > [data-tabs="content"] [data-tabs="element"]');
  const dataHeight = tab.dataset.height;

  setTabStartState(tab);

  updateTabHeight(tab, dataHeight, contentBlock);

  controls.forEach((control, index) => {
    control.addEventListener('click', (evt) => {
      evt.preventDefault();
      const parent = evt.target.closest('[data-tabs="parent"]');

      if (control.classList.contains('is-active') || parent.classList.contains('no-action')) {
        return;
      }

      const activeControl = tab.querySelector(':scope > [data-tabs="controls"] [data-tabs="control"].is-active');
      const activeTabElement = tab.querySelector(':scope > [data-tabs="content"] [data-tabs="element"].is-active');
      const currentHeight = contentBlock.scrollHeight;
      const newHeight = tabsElements[index].scrollHeight;

      parent.classList.add('no-action');

      if (activeControl) {
        activeControl.classList.remove('is-active');
      }

      if (activeTabElement) {
        activeTabElement.classList.remove('is-active');
      }

      if (currentHeight > newHeight) {
        setTimeout(() => {
          if (dataHeight !== 'max') {
            contentBlock.style.height = newHeight + 'px';
          }
          control.classList.add('is-active');
          tabsElements[index].classList.add('is-active');
          parent.classList.remove('no-action');
        }, delay);
      } else {
        if (dataHeight !== 'max') {
          contentBlock.style.height = newHeight + 'px';
        }
        setTimeout(() => {
          control.classList.add('is-active');
          tabsElements[index].classList.add('is-active');
          parent.classList.remove('no-action');
        }, delay);
      }
    });
  });
};

export const initTabs = () => {
  const tabs = document.querySelectorAll('[data-tabs="parent"]:not(.is-initialized)');
  tabs.forEach((tab) => initTabAction(tab));
};
