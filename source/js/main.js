import {ieFix} from './utils/ie-fix';

import {initModals} from '../components/modal/init-modals';
import {Tabs} from '../components/tabs/tabs';
import {initAccordions} from '../components/accordion/js/init-accordion';
import '../components/custom-select/custom-select';
import '../components/form-validate/init-form-validate';
import {initAutoResizeTextarea} from '../components/auto-resize-textarea/auto-resize-textarea';
import {initPhoneMask} from '../components/phone-mask/phone-mask';


// Utils
// ---------------------------------

ieFix();

// Modules
// ---------------------------------

initModals();
initAutoResizeTextarea();
initPhoneMask();
//initTabs();
initAccordions();

const tabElements = document.querySelectorAll('[data-tabs="parent"]');

const tabs = new Tabs(tabElements);
