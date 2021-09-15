import {Tabs} from './tabs';

let tabs;

const initTabs = () => {
  tabs = new Tabs();
  // Раскомментировать только при запросе бэкэнда на вынос экземпляра класса в глобальную область видимости
  // window.tabs = tabs;
};

export {initTabs, tabs};
