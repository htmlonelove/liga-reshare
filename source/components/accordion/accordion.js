const setAccordionStartState = (accordion) => {
  const activeContent = accordion.querySelectorAll('[data-accordion="element"].is-open');
  if (activeContent.length) {
    activeContent.forEach((el) => {
      const content = el.querySelector('[data-accordion="content"]');
      content.style.transition = 'none';
      content.style.maxHeight = '100%';
      setTimeout(() => {
        content.style.transition = null;
        content.style.maxHeight = content.scrollHeight + 'px';
      }, 300);
    });
  }
};

const updateActiveAccordion = () => {
  const activeContent = document.querySelectorAll('[data-accordion="parent"]:not(.no-transition) [data-accordion="element"].is-open [data-accordion="content"]');
  if (activeContent.length) {
    activeContent.forEach((el) => {
      el.style.transition = 'none';
      el.style.maxHeight = el.scrollHeight + 'px';
      setTimeout(() => {
        el.style.transition = null;
      }, 300);
    });
  }
};

const closeAllAccordionElement = (accordion) => {
  const openAccordionElement = accordion.querySelectorAll(':scope> [data-accordion="element"].is-open');
  openAccordionElement.forEach((el) => {
    const content = el.querySelector('[data-accordion="content"]');
    el.classList.remove('is-open');
    content.style.maxHeight = null;
  });
};

const accordionAction = (e, type, accordion, isEnclosure) => {
  if (e.target.closest('[data-accordion="button"]')) {
    const parent = e.target.closest('[data-accordion="element"]');
    const content = parent.querySelector('[data-accordion="content"]');
    e.target.blur();
    if (parent.classList.contains('is-open')) {
      parent.classList.remove('is-open');
      if (!isEnclosure) {
        content.style.maxHeight = null;
      }
    } else {
      if (type === 'single') {
        closeAllAccordionElement(accordion);
      }
      parent.classList.add('is-open');
      if (!isEnclosure) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    }
  }
};

const initAccordionAction = (accordion) => {
  accordion.classList.add('is-initialized');
  const innerAccordion = accordion.querySelector('[data-accordion="parent"]');
  const outerAccordion = accordion.closest('[data-accordion="content"]');
  const isEnclosure = !!innerAccordion || !!outerAccordion;
  let type = accordion.dataset.type;
  if (!type) {
    type = 'multiple';
  }

  if (isEnclosure) {
    accordion.classList.add('no-transition');
  } else {
    setAccordionStartState(accordion);
  }

  accordion.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    accordionAction(e, type, accordion, isEnclosure);
  });
};

const initAccordion = () => {
  const accordions = document.querySelectorAll('[data-accordion="parent"]:not(.is-initialized)');
  if (accordions.length) {
    accordions.forEach((accordion) => initAccordionAction(accordion));
  }

  const transitionAccordions = document.querySelectorAll('[data-accordion="parent"]:not(.no-transition)');
  if (transitionAccordions.length) {
    window.addEventListener('resize', updateActiveAccordion);
  } else {
    window.removeEventListener('resize', updateActiveAccordion);
  }
};

window.initAccordion = initAccordion;

export default initAccordion();
