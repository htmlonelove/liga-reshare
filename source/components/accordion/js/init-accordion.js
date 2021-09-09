import {Accordions} from './accordions';
let accordions;

const initAccordions = () => {
  accordions = new Accordions();
  window.accordions = accordions;
};

export {initAccordions, accordions};
