import {ieFix} from './utils/ie-fix';

import {initModals} from '../components/modal/init-modals';
import {initAutoresizeTextarea} from '../components/autoresize-textarea/autoresize-textarea';
import {initPhoneMask} from '../components/phone-mask/phone-mask';
import {initInputSelect} from '../components/custom-select/custom-select';

// Utils
// ---------------------------------

ieFix();

// Modules
// ---------------------------------

initModals();
initAutoresizeTextarea();
initPhoneMask();
initInputSelect();
