import React, { useEffect, useMemo, useState } from 'react';
import { PrivateRoutesEnum } from 'src/router';
import styles from './AdministrationPage.styl';

import { useLocation, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AdministrationRecipes from 'src/pages/AdministrationPage/AdministrationRecipes/AdministrationRecipes';
import { Button } from 'antd';

type TabType = {
  path: PrivateRoutesEnum;
  title: string;
  component: JSX.Element;
};

const AdministrationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onChangeTab = (value: TabType) => {
    navigate(
      `${PrivateRoutesEnum.ADMINISTRATION}/${value?.path}${location.search}`,
    );
    setTab(value);
  };

  const myLoc = location.pathname.split('/')[2];

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
  const [tab, setTab] = useState<TabType>(
    Tabs.find((tab) => tab.path === myLoc) || Tabs[0],
  );

  // side effects
  useEffect(() => {
    const el = Tabs.find((item) => location.pathname.startsWith(item.path));
    if (el) return setTab(el);
  }, [Tabs, location.pathname]);
  return (
    <section className={styles.Administration}>
      <div className={styles.Administration__nav}>
        {Tabs.map((itm, index) => (
          <Button
            type={tab?.title === itm?.title ? 'primary' : 'default'}
            onClick={() => onChangeTab(itm)}
            key={index}
          >
            {itm.title}
          </Button>
        ))}
      </div>

      <div>
        {tab.path === PrivateRoutesEnum.RECIPES && <AdministrationRecipes />}
      </div>
    </section>
  );
};

export default AdministrationPage;
