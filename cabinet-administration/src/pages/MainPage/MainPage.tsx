import React, { useState } from 'react';
import styles from './MainPage.styl';
import { Text } from '@consta/uikit/Text';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import ComponentStyleWrapper from 'src/components/ComponentStyleWrapper/ComponentStyleWrapper';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
import MainPageOrders from 'src/pages/MainPage/MainPageOrders/MainPageOrders';
import MainPageSales from 'src/pages/MainPage/MainPageSales/MainPageSales';
import MainPageTodoList from 'src/pages/MainPage/MainPageTodoList/MainPageTodoList';
import MainPageUsers from 'src/pages/MainPage/MainPageUsers/MainPageUsers';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import MainPageCreateOrderModal from 'src/pages/MainPage/MainPageCreateOrderModal/MainPageCreateOrderModal';

const MainPage: React.FC = () => {
  const userName = localStorage.getItem(LocalStorageKeysEnum.NAME);
  const [modal, setModal] = useState(false);
  const openOrderCreate = () => {
    setModal(true);
  };
  return (
    <MainWrapper>
      <Text size={'3xl'}>Добро пожаловать, {userName}!</Text>
      <section className={styles.General}>
        <ComponentStyleWrapper>
          <div className={styles.General__ordersHeader}>
            <Text size={'l'}>Ближайшие заказы</Text>
            <Button
              label={'Зарегистрировать новый заказ'}
              size={'xs'}
              onClick={openOrderCreate}
            />
          </div>
          <MainPageOrders />
        </ComponentStyleWrapper>
        <ComponentStyleWrapper>
          <MainPageTodoList />
        </ComponentStyleWrapper>
        <ComponentStyleWrapper>
          <Text size={'l'}>Уникальные пользователи приложения</Text>
          <MainPageUsers />
        </ComponentStyleWrapper>
        <ComponentStyleWrapper>
          <Text size={'l'}>Статистика продаж</Text>
          <MainPageSales />
        </ComponentStyleWrapper>
      </section>
      <Modal isOpen={modal}>
        <MainPageCreateOrderModal modal={modal} setModal={setModal} />
      </Modal>
    </MainWrapper>
  );
};

export default MainPage;
