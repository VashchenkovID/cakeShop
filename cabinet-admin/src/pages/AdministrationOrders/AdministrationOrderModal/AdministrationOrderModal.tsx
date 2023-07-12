import React, { useMemo } from "react";
import { OrderProcessingModel } from "src/api/models/OrderProcessingModel";
import styles from "./AdministrationOrderModal.module.styl";
import { Text } from "@consta/uikit/Text";
import { User } from "@consta/uikit/User";
import OrderProcessingStatusBadge from "src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge";
import { OrderProcessingStatusEnum } from "src/api/models/OrderProcessingStatusEnum";
import { Button } from "@consta/uikit/Button";

interface IComponentProps {
  onClose(): void;
  order: OrderProcessingModel | null;
}

const AdministrationOrderModal: React.FC<IComponentProps> = ({
  onClose,
  order,
}) => {
  const fullPrice = useMemo(() => {
    if (order) {
      return order.items.reduce((accum, elem) => accum + elem.price, 0);
    } else return null;
  }, [order]);
  return (
    <>
      {order && (
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
          </div>
          <div className={styles.Container__footer}>
            {fullPrice && <Text size={"2xl"}>Итого: {fullPrice} ₽</Text>}
          </div>
          <Button label={"Закрыть"} onClick={onClose} />
        </div>
      )}
    </>
  );
};

export default AdministrationOrderModal;
