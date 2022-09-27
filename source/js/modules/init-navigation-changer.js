import {NavigationChanger} from '../utils/navigation-changer';

const initNavigationChanger = () => {
  const navigationChanger = new NavigationChanger();
  setTimeout(() => {
    navigationChanger.init();
  }, 300);
};

export {initNavigationChanger};
