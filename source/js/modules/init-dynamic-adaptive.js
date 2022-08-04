import {DynamicAdaptive} from '../utils/dynamic-adaptive';

const initDynamicAdaptive = () => {
  const dynamicAdaptive = new DynamicAdaptive('max');
  dynamicAdaptive.init();
};

export {initDynamicAdaptive};
