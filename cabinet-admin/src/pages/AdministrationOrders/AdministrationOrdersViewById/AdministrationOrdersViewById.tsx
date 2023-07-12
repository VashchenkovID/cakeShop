import React, { useMemo } from "react";
import { OrderProcessingModel } from "src/api/models/OrderProcessingModel";
import { Loader } from "@consta/uikit/Loader";
import { Text } from "@consta/uikit/Text";
import { User } from "@consta/uikit/User";
import OrderProcessingStatusBadge from "src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge";
import { OrderProcessingStatusEnum } from "src/api/models/OrderProcessingStatusEnum";
import styles from "./AdministrationOrdersViewById.module.styl";
import { Button } from "@consta/uikit/Button";
import ordersApi from "src/api/requests/ordersApi";
import InformerBadge from "src/components/Informer/Informer";

interface IComponentProps {
  order: OrderProcessingModel | null;
  isFullLoading: boolean;
  setNull(param: null): void;
  activeOrder?: OrderProcessingModel | null;
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
      return (
        order.items.reduce(
          (accum, elem) => accum + elem.price * elem.count,
          0
        ) +
        order.decors
          .map((dec) =>
            dec.items.reduce((acc, el) => acc + el.pricePerUnit * el.count, 0)
          )
          .reduce((acc, el) => acc + el, 0)
      );
    } else return null;
  }, [order]);
  const returnOrderInProcessing = async () => {
    if (order && activeOrder) {
      await ordersApi
        .updateOrderProcessing(order.id.toString(), {
          type: activeOrder.type,
          status: OrderProcessingStatusEnum.CONSIDERATION,
        })
        .then(() => {
          setNull(null);
          getOrders(date.toISOString());
        });
    }
  };
  return (
    <div>
      {isFullLoading && <Loader />}
      {!isFullLoading && !order && !activeOrder && (
        <InformerBadge text={"Выберите заказ из меню слева"} />
      )}
      {!isFullLoading && order && (
        <div className={styles.Container}>
          <div className={styles.Container__header}>
            <div>
              <Text size={"3xl"}>{order.name}</Text>
              <User
                size={"l"}
                name={order.customer}
                info={order.customer_phone}
              />
              <Text view={"secondary"}>
                Дата выдачи:{" "}
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
            {fullPrice && <Text size={"2xl"}>Итого: {fullPrice} ₽</Text>}
            <div className={styles.Container__footer__actions}>
              {order.status === OrderProcessingStatusEnum.REJECTED && (
                <Button
                  size={"s"}
                  label={"Вернуть"}
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
