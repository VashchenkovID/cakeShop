import React, { useEffect, useState } from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import useRequest from 'src/hooks/useRequest';
import ordersApi from 'src/api/requests/ordersApi';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import { Text } from '@consta/uikit/Text';
import MainPageOrdersItem from 'src/pages/MainPage/MainPageOrders/MainPageOrdersItem/MainPageOrdersItem';
import styles from './MainPageOrders.styl';

const MainPageOrders: React.FC = () => {
  const actualDate = new Date();
  const [orders, setOrders] = useState<OrderProcessingModel[]>([]);
  const { load: getOrders, isLoading } = useRequest(
    ordersApi.getOrderProcessing,
    (r) => {
      if (r) {
        setOrders(
          r.data.items.map((order, index) => {
            return { ...order, order: index };
          }),
        );
      }
    },
  );

  useEffect(() => {
    getOrders(actualDate.toISOString());
  }, []);
  return (
    <>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <div className={styles.Orders}>
          <div className={styles.Orders__header}>
            <Text>Заказ</Text>
            <Text>Создан</Text>
            <Text>Статус</Text>
          </div>
          {orders.length > 0 ? (
            orders
              .slice(0, 10)
              .map((order, index) => (
                <MainPageOrdersItem
                  order={order}
                  key={`${order.id}+${index}`}
                />
              ))
          ) : (
            <Text align={'center'}>Заказов в данном месяце еще нет</Text>
          )}
        </div>
      )}
    </>
  );
};

export default MainPageOrders;
