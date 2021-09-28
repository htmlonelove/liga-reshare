import {ieFix} from './utils/ie-fix';

import {initModals} from '../components/modals/js/init-modals';
import {initTabs} from '../components/tabs/js/init-tabs';
import {initAccordions} from '../components/accordion/js/init-accordion';
import '../components/focus-lock/js/focus-lock';
import '../components/scroll-lock/js/scroll-lock';
import '../components/custom-select/js/custom-select';
import '../components/form-validate/init-form-validate';
import {initAutoResizeTextarea} from '../components/auto-resize-textarea/js/auto-resize-textarea';
import {initPhoneMask} from '../components/phone-mask/js/phone-mask';
import {cookieConsentChecker} from '../components/cookies/js/cookie-consent-checker';

// Utils
// ---------------------------------

ieFix();

// Modules
// ---------------------------------

initModals();
initAutoResizeTextarea();
initPhoneMask();
initAccordions();
initTabs();
cookieConsentChecker();
