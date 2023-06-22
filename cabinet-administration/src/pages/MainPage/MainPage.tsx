import React from 'react';
import styles from './MainPage.styl';
import { Text } from '@consta/uikit/Text';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import ComponentStyleWrapper from 'src/components/ComponentStyleWrapper/ComponentStyleWrapper';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
import MainPageOrders from 'src/pages/MainPage/MainPageOrders/MainPageOrders';
import MainPageSales from 'src/pages/MainPage/MainPageSales/MainPageSales';
import MainPageTodoList from 'src/pages/MainPage/MainPageTodoList/MainPageTodoList';

const MainPage: React.FC = () => {
  const userName = localStorage.getItem(LocalStorageKeysEnum.NAME);

  return (
    <MainWrapper>
      <Text size={'3xl'}>Добро пожаловать, {userName}!</Text>
      <section className={styles.General}>
        <ComponentStyleWrapper>
          <Text size={'l'}>Ближайшие заказы</Text>
          <MainPageOrders />
        </ComponentStyleWrapper>
        <ComponentStyleWrapper>
          <Text size={'l'}>Напоминания</Text>
          <MainPageTodoList />
        </ComponentStyleWrapper>
        <ComponentStyleWrapper>
          <Text size={'l'}>Посещения за месяц</Text>
        </ComponentStyleWrapper>
        <ComponentStyleWrapper>
          <Text size={'l'}>Статистика продаж</Text>
          <MainPageSales />
        </ComponentStyleWrapper>
      </section>
    </MainWrapper>
  );
};

export default MainPage;
