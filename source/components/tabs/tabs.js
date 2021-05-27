const removeAllActiveClasses = (tab) => {
  const controls = tab.querySelectorAll(':scope > [data-tab="controls"] [data-tab="control"]');
  const tabsElements = tab.querySelectorAll(':scope > [data-tab="content"] [data-tab="element"]');

  controls.forEach((control) => {
    if (control) {
      control.classList.remove('is-active');
    }
  });

  tabsElements.forEach((element) => {
    element.classList.remove('is-active');
  });
};

const updateTabHeight = (tab, dataHeight, contentBlock) => {
  window.addEventListener('resize', () => {
    if (dataHeight === 'max') {
      contentBlock.style.height = returnMaxHeight(tab) + 'px';
    } else {
      contentBlock.style.height = tab.querySelector(':scope > [data-tab="content"] [data-tab="element"].is-active').scrollHeight + 'px';
    }
  });
};

const returnActiveIndex = (tab) => {
  let index = 0;
  let flag = true;
  const controls = tab.querySelectorAll(':scope > [data-tab="controls"] [data-tab="control"]');
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
  const tabsElements = tab.querySelectorAll(':scope > [data-tab="content"] [data-tab="element"]');
  let heights = [];
  tabsElements.forEach((element) => {
    heights.push(element.scrollHeight);
  });
  heights.sort();
  return heights[heights.length - 1];
};

const setTabStartState = (tab) => {
  const controls = tab.querySelectorAll(':scope > [data-tab="controls"] [data-tab="control"]');
  const tabsElements = tab.querySelectorAll(':scope > [data-tab="content"] [data-tab="element"]');
  const contentBlock = tab.querySelector(':scope > [data-tab="content"]');
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
  const contentBlock = tab.querySelector(':scope > [data-tab="content"]');
  const controls = tab.querySelectorAll(':scope > [data-tab="controls"] [data-tab="control"]');
  const tabsElements = tab.querySelectorAll(':scope > [data-tab="content"] [data-tab="element"]');
  const dataHeight = tab.dataset.height;

  setTabStartState(tab);
  updateTabHeight(tab, dataHeight, contentBlock);
  controls.forEach((control, i) => {
    control.addEventListener('click', (e) => {
      e.preventDefault();
      if (control.classList.contains('is-active')) {
        return;
      }

      const activeControl = tab.querySelector(':scope > [data-tab="controls"] [data-tab="control"].is-active');
      const activeTabElement = tab.querySelector(':scope > [data-tab="content"] [data-tab="element"].is-active');
      const currentHeight = contentBlock.scrollHeight;
      const newHeight = tabsElements[i].scrollHeight;

      activeControl.classList.remove('is-active');
      activeTabElement.classList.remove('is-active');

      if (currentHeight > newHeight) {
        setTimeout(() => {
          control.classList.add('is-active');
          tabsElements[i].classList.add('is-active');
          if (dataHeight !== 'max') {
            contentBlock.style.height = newHeight + 'px';
          }
        }, delay);
      } else {
        if (dataHeight !== 'max') {
          contentBlock.style.height = newHeight + 'px';
        }
        setTimeout(() => {
          control.classList.add('is-active');
          tabsElements[i].classList.add('is-active');
        }, delay);
      }
    });
  });
};

const initTabs = () => {
  const tabs = document.querySelectorAll('[data-tab="parent"]:not(.is-initialized)');
  if (tabs.length) {
    tabs.forEach((tab) => initTabAction(tab));
  }
};

window.initTabs = initTabs;

export default initTabs();
