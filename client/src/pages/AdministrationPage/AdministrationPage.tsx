import React, { useEffect, useMemo, useState } from 'react';
import { PrivateRoutesEnum } from 'src/router';
import styles from './AdministrationPage.styl';

import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AdministrationRecipes from 'src/pages/AdministrationPage/AdministrationRecipes/AdministrationRecipes';

type TabType = {
  path: PrivateRoutesEnum;
  title: string;
  component: JSX.Element;
};

const AdministrationPage: React.FC = () => {
  const location = useLocation();
  const history = createBrowserHistory();
  const onChangeTab = (value: TabType) => {
    history.push(
      `${PrivateRoutesEnum.ADMINISTRATION}/${value?.path}${location.search}`,
    );
    setTab(value);
  };
  const Tabs: Array<TabType> = useMemo(
    () => [
      {
        path: PrivateRoutesEnum.ANALYTICS,
        component: <div></div>,
        title: 'Аналитика',
      },
      {
        path: PrivateRoutesEnum.RECIPES,
        component: <div></div>,
        title: `Рецепты`,
      },
      {
        path: PrivateRoutesEnum.ORDERS,
        component: <div></div>,
        title: `Заказы`,
      },
    ],
    [],
  );
  const [tab, setTab] = useState<TabType>(Tabs[0]);

  // side effects
  useEffect(() => {
    const el = Tabs.find((item) => location.pathname.startsWith(item.path));
    if (el) return setTab(el);
  }, [Tabs, location.pathname]);
  return (
    <section className={styles.Administration}>
      <div className={styles.Administration__nav}>
        {Tabs.map((itm, index) => (
          <button
            color={tab.title === itm.title ? 'primary' : 'secondary'}
            onClick={() => onChangeTab(itm)}
            key={index}
          >
            {itm.title}
          </button>
        ))}
      </div>

      <div>
        {tab.path === PrivateRoutesEnum.RECIPES && <AdministrationRecipes />}
      </div>
    </section>
  );
};

export default AdministrationPage;
