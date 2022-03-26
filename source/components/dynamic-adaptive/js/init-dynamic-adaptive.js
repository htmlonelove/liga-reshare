import {DynamicAdapt} from './dynamic-adaptive';

const initDynamicAdaptive = () => {
  const da = new DynamicAdapt('max');
  da.init();
};

export {initDynamicAdaptive};
