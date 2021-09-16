import {ieFix} from './utils/ie-fix';

import {initModals} from '../components/modal/init-modals';
import {initTabs} from '../components/tabs/js/init-tabs';
import {initAccordions} from '../components/accordion/js/init-accordion';
import '../components/custom-select/custom-select';
import '../components/form-validate/init-form-validate';
import {initAutoResizeTextarea} from '../components/auto-resize-textarea/auto-resize-textarea';
import {initPhoneMask} from '../components/phone-mask/phone-mask';
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
