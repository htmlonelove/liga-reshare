const tabs = document.querySelectorAll('.tab');

const removeControlActiveClass = (arr) => {
  arr.forEach((el) => {
    el.classList.remove('active');
  });
};

const removeItemActiveClass = (arr) => {
  arr.forEach((el) => {
    el.classList.add('no-opacity');
    setTimeout(() => {
      el.classList.add('hide');
    }, 250);
  });
};

const findChild = (node, cssClass) => {
  let child;
  Array.prototype.forEach.call(node.children, (el) => {
    if (el.classList.contains(cssClass)) {
      child = el;
    }
  });
  return child;
};

const removeChild = (node, arr) => {
  const newArr = [];
  arr.forEach((el) => {
    const parent = el.closest('.tab');
    if (parent === node) {
      newArr.push(el);
    }
  });
  return newArr;
};

const initTabAction = (controls, cleanItems) => {
  controls.forEach((control, index) => {
    control.addEventListener('click', (e) => {
      e.preventDefault();
      removeItemActiveClass(cleanItems);
      removeControlActiveClass(controls);
      control.classList.add('active');
      setTimeout(() => {
        cleanItems[index].classList.remove('no-opacity');
      }, 300);
      setTimeout(() => {
        cleanItems[index].classList.remove('hide');
      }, 310);
    });
  });
};

const setupTabAction = (tab) => {
  const controlChild = findChild(tab, 'tab__controls');
  const itemsChild = findChild(tab, 'tab__items');
  if (controlChild, itemsChild) {
    const controls = findChild(tab, 'tab__controls').querySelectorAll('.tab__control');
    const items = itemsChild.querySelectorAll('.tab__item');
    const cleanItems = removeChild(tab, items);
    initTabAction(controls, cleanItems);
  }
};

const initTabs = () => {
  if (tabs.length) {
    tabs.forEach((tab) => setupTabAction(tab));
  }
};

export {initTabs};
