import React, { useEffect, useMemo, useState } from 'react';
import { PrivateRoutesEnum } from 'src/router';
import styles from './AdministrationPage.styl';

import { useLocation, useNavigate } from 'react-router-dom';
import AdministrationRecipes from 'src/pages/AdministrationPage/AdministrationRecipes/AdministrationRecipes';
import AdministrationTypes from 'src/pages/AdministrationPage/AdministrationTypes/AdministrationTypes';
import AdministrationOrdersProcessing from 'src/pages/AdministrationPage/AdministrationOrdersProcessing/AdministrationOrdersProcessing';
import { Tabs } from '@consta/uikit/Tabs';
import AdministrationAnalytics from 'src/pages/AdministrationPage/AdministrationAnalytics/AdministrationAnalytics';
import AdministrationOrders from 'src/pages/AdministrationPage/AdministrationOrders/AdministrationOrders';
import AdministrationCalendar from 'src/pages/AdministrationPage/AdministrationCalendar/AdministrationCalendar';
import AdministrationFeedback from 'src/pages/AdministrationPage/AdministrationFeedback/AdministrationFeedback';

type TabType = {
  path: PrivateRoutesEnum;
  title: string;
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

  const TabsArr: Array<TabType> = useMemo(
    () => [
      {
        path: PrivateRoutesEnum.CALENDAR,
        title: 'Календарь заказов',
      },
      {
        path: PrivateRoutesEnum.ANALYTICS,
        title: 'Аналитика',
      },
      {
        path: PrivateRoutesEnum.RECIPES,
        title: `Рецепты`,
      },
      {
        path: PrivateRoutesEnum.ORDERS,
        title: `Обработка заказов`,
      },
      {
        path: PrivateRoutesEnum.ORDERS_HISTORY,
        title: `История заказов`,
      },
      {
        path: PrivateRoutesEnum.FEEDBACK,
        title: `Отзывы покупателей`,
      },
      {
        path: PrivateRoutesEnum.TYPES,
        title: `Вспомогательные типы`,
      },
    ],
    [],
  );
  const [tab, setTab] = useState<TabType>(
    TabsArr.find((tab) => tab.path === myLoc) || TabsArr[0],
  );

  // side effects
  useEffect(() => {
    const el = TabsArr.find((item) => location.pathname.startsWith(item.path));
    if (el) return setTab(el);
  }, [TabsArr, location.pathname]);
  return (
    <section className={styles.Administration}>
      <div className={styles.Administration__nav}>
        <Tabs
          className={styles.tabs}
          getItemLabel={(i) => i.title}
          items={TabsArr}
          value={tab}
          onChange={(itm) => {
            onChangeTab(itm.value);
          }}
        />
      </div>
      <div>
        {tab.path === PrivateRoutesEnum.RECIPES && <AdministrationRecipes />}
        {tab.path === PrivateRoutesEnum.TYPES && <AdministrationTypes />}
        {tab.path === PrivateRoutesEnum.ORDERS && (
          <AdministrationOrdersProcessing />
        )}
        {tab.path === PrivateRoutesEnum.ANALYTICS && (
          <AdministrationAnalytics />
        )}
        {tab.path === PrivateRoutesEnum.ORDERS_HISTORY && (
          <AdministrationOrders />
        )}
        {tab.path === PrivateRoutesEnum.CALENDAR && <AdministrationCalendar />}
        {tab.path === PrivateRoutesEnum.FEEDBACK && <AdministrationFeedback />}
      </div>
    </section>
  );
};

export default AdministrationPage;
