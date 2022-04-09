import {DynamicAdaptive} from './dynamic-adaptive';

const initDynamicAdaptive = () => {
  const da = new DynamicAdaptive('max');
  da.init();
};

export {initDynamicAdaptive};
