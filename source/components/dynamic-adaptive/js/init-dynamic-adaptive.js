import {DynamicAdaptive} from './dynamic-adaptive';

const initDynamicAdaptive = () => {
  const dynamicAdaptive = new DynamicAdaptive('max');
  dynamicAdaptive.init();
};

export {initDynamicAdaptive};
