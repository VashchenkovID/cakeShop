import React, { useEffect, useMemo, useState } from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import useRequest from 'src/hooks/useRequest';
import ordersApi from 'src/api/requests/ordersApi';
import styles from './AdministrationOrders.styl';
import AdministrationOrdersSideMenu from 'src/pages/AdministrationPage/AdministrationOrdersSideMenu/AdministrationOrdersSideMenu';
import CustomMonthPicker from 'src/components/CustomMonthPicker/CustomMonthPicker';
import { Loader } from '@consta/uikit/Loader';
import AdministrationOrdersViewById from 'src/pages/AdministrationPage/AdministrationOrdersViewById/AdministrationOrdersViewById';

const AdministrationOrders: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [orders, setOrders] = useState<OrderProcessingModel[]>([]);
  const [order, setOrder] = useState<OrderProcessingModel | null>(null);
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const { load: getOrders, isLoading } = useRequest(
    ordersApi.getHistory,
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
  const { load: getHistoryOrder, isLoading: isFullLoading } = useRequest(
    ordersApi.getHistoryOrder,
    (r) => {
      if (r) {
        setOrder(r.data);
      }
    },
  );
  const setNull = (param: null) => {
    setActiveElement(param);
    setOrder(null);
  };
  const activeOrder = useMemo(() => {
    if (activeElement || activeElement === 0) {
      return orders.find((elem) => elem.dropId === activeElement);
    } else return null;
  }, [activeElement]);

  useEffect(() => {
    getOrders(date.toISOString());
  }, [date]);

  useEffect(() => {
    if (activeOrder) {
      getHistoryOrder(activeOrder.id.toString(), activeOrder.type);
    }
  }, [activeOrder]);

  return (
    <section className={styles.Orders}>
      <div className={styles.Orders__leftSide}>
        <div onClick={() => setActiveElement(null)}>
          <CustomMonthPicker setNull={setNull} date={date} setDate={setDate} />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <AdministrationOrdersSideMenu
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            orders={orders}
          />
        )}
      </div>
      <AdministrationOrdersViewById
        order={order}
        isFullLoading={isFullLoading}
        setNull={setNull}
        activeOrder={activeOrder}
        getOrders={getOrders}
        date={date}
      />
    </section>
  );
};

export default AdministrationOrders;