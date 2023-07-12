import React, { SetStateAction, useEffect, useMemo, useState } from 'react';

import styles from './AdministrationOrderProcessingCraftModal.module.styl';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import useRequest from 'src/hooks/useRequest';
import ordersApi from 'src/api/requests/ordersApi';
import { Loader } from '@consta/uikit/Loader';
import { Text } from '@consta/uikit/Text';
import { User } from '@consta/uikit/User';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';

interface IComponentProps {
  activeElement: {type: string, id: number | null}
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}


const AdministrationOrderProcessingCraftModal: React.FC<IComponentProps> = ({
  activeElement,

}) => {
  const [order, setOrder] = useState<OrderProcessingModel | null>(null);
  const { load: getHistoryOrder, isLoading: isFullLoading } = useRequest(
    ordersApi.getHistoryOrder,
    (r) => {
      if (r) {
        setOrder(r.data);
      }
    },
  );
  const fullPrice = useMemo(() => {
    if (order) {
      return (
        order.items.reduce(
          (accum, elem) => accum + elem.price * elem.count,
          0,
        ) +
        order.decors
          .map((dec) =>
            dec.items.reduce((acc, el) => acc + el.pricePerUnit * el.count, 0),
          )
          .reduce((acc, el) => acc + el, 0)
      );
    } else return null;
  }, [order]);
  useEffect(() => {
    if (activeElement && activeElement.id) {
      getHistoryOrder(activeElement.id.toString(), activeElement.type);
    }
  }, [activeElement]);
  return (
    <div>
      {isFullLoading && <Loader />}
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
                <div>{item.price} ₽</div>
              </div>
            ))}
            <div className={styles.Container__decor}></div>
            {order.decors.map((decor, idx) => (
              <div className={styles.Container__rows__decor} key={idx}>
                <div>{decor.name}</div>
                <div className={styles.Container__rows__decor__rows}>
                  <div
                    className={styles.Container__rows__decor__rows__decHeader}
                  >
                    <div>Наименование</div>
                    <div>Кол-во</div>
                    <div>Ед.изм</div>
                    <div>Цена за ед</div>
                    <div>Цена закупки</div>
                  </div>
                  {decor.items.map((d, i) => (
                    <div
                      className={styles.Container__rows__decor__rows__decRow}
                      key={i}
                    >
                      <div>{d.name}</div>
                      <div>{d.count}</div>
                      <div>{d.countType}</div>
                      <div>{d.pricePerUnit} ₽</div>
                      <div>{d.constPrice} ₽</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.Container__footer}>
            {fullPrice && <Text size={'2xl'}>Итого: {fullPrice} ₽</Text>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrationOrderProcessingCraftModal;
