import React, { useEffect, useMemo, useState } from 'react';
import { PrivateRoutesEnum } from 'src/router';
import styles from './AdministrationPage.styl';

import { useLocation, useNavigate } from 'react-router-dom';
import AdministrationRecipes from 'src/pages/AdministrationPage/AdministrationRecipes/AdministrationRecipes';
import AdministrationTypes from 'src/pages/AdministrationPage/AdministrationTypes/AdministrationTypes';
import { Button } from '@consta/uikit/Button';
import AdministrationOrdersProcessing from 'src/pages/AdministrationPage/AdministrationOrdersProcessing/AdministrationOrdersProcessing';

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
      {
        path: PrivateRoutesEnum.TYPES,
        component: <div></div>,
        title: `Вспомогательные типы`,
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
            view={tab?.title === itm?.title ? 'primary' : 'secondary'}
            onClick={() => onChangeTab(itm)}
            key={index}
            label={itm.title}
          />
        ))}
      </div>
      <div>
        {tab.path === PrivateRoutesEnum.RECIPES && <AdministrationRecipes />}
        {tab.path === PrivateRoutesEnum.TYPES && <AdministrationTypes />}
        {tab.path === PrivateRoutesEnum.ORDERS && (
          <AdministrationOrdersProcessing />
        )}
      </div>
    </section>
  );
};

export default AdministrationPage;
