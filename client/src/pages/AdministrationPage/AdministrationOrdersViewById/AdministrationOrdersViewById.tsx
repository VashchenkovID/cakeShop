import React, { useMemo } from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import { Loader } from '@consta/uikit/Loader';
import { Text } from '@consta/uikit/Text';
import { User } from '@consta/uikit/User';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import styles from './AdministrationOrdersViewById.styl';
import { Button } from '@consta/uikit/Button';
import ordersApi from 'src/api/requests/ordersApi';

interface IComponentProps {
  order: OrderProcessingModel;
  isFullLoading: boolean;
  setNull(param: null): void;
  activeOrder: OrderProcessingModel;
  getOrders: (date: string) => void;
  date: Date;
}

const AdministrationOrdersViewById: React.FC<IComponentProps> = ({
  order,
  isFullLoading,
  setNull,
  activeOrder,
  getOrders,
  date,
}) => {
  const fullPrice = useMemo(() => {
    if (order) {
      return order.items.reduce((accum, elem) => accum + elem.price, 0);
    } else return null;
  }, [order]);
  const returnOrderInProcessing = async () => {
    await ordersApi
      .updateOrderProcessing(order.id.toString(), {
        type: activeOrder.type,
        status: OrderProcessingStatusEnum.CONSIDERATION,
      })
      .then(() => {
        setNull(null);
        getOrders(date.toISOString());
      });
  };
  return (
    <div>
      {isFullLoading && <Loader />}
      {!isFullLoading && !order && !activeOrder && (
        <div className={styles.Container}>
          <Text align={'center'} view={'secondary'}>
            Выберите заказ из меню слева
          </Text>
        </div>
      )}
      {!isFullLoading && order && (
        <div className={styles.Container}>
          <div className={styles.Container__header}>
            <div>
              <Text size={'3xl'}>{order.name}</Text>
              <User
                size={'l'}
                name={order.customer}
                info={order.customer_phone}
              />
              <Text view={'secondary'}>
                Дата выдачи:{' '}
                {new Date(order.date_completed).toLocaleDateString()}
              </Text>
            </div>
            <OrderProcessingStatusBadge
              status={order.status as OrderProcessingStatusEnum}
            />
          </div>
          <div className={styles.Container__rows}>
            {order.items.map((item, index) => (
              <div className={styles.Container__rows__row} key={index}>
                <div>{item.name}</div>
                <div>{item.count}шт</div>
                <div>{item.price},00 ₽</div>
              </div>
            ))}
          </div>
          <div className={styles.Container__footer}>
            {fullPrice && <Text size={'2xl'}>Итого: {fullPrice},00 ₽</Text>}
            <div className={styles.Container__footer__actions}>
              {order.status === OrderProcessingStatusEnum.REJECTED && (
                <Button
                  size={'s'}
                  label={'Вернуть'}
                  onClick={returnOrderInProcessing}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrationOrdersViewById;
