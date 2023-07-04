import React, { useMemo } from "react";
import { OrderModel } from "src/api/models/OrderModel";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import OrderStatusBadge from "src/components/OrderStatusBadge/OrderStatusBadge";
import styles from "./OrdersItem.module.styl";

interface IComponentProps {
  item: OrderModel;
  width: number;
}

const OrdersItem: React.FC<IComponentProps> = ({ item, width }) => {
  const allPrice = useMemo(() => {
    return (
      item.items.reduce((acc, elem) => acc + elem.price * elem.count, 0) +
      item.decors.reduce(
        (acc, elem) => acc + Number(elem.count) * Number(elem.pricePerUnit),
        0
      )
    );
  }, [item]);
  return (
    <ComponentStyleWrapper>
      <div className={styles.Item}>
        <div className={styles.Item__header}>
          <Text size={width <= 500 ? "s" : "m"}>
            {`${item.name} от ${new Date(item.createdAt).toLocaleDateString()}`}
            <Text size={width <= 500 ? "xs" : "s"} view={"secondary"}>
              Дата выдачи: {new Date(item.date_completed).toLocaleDateString()}
            </Text>
          </Text>
          <OrderStatusBadge status={item.status} />
        </div>
        {allPrice !== 0 && (
          <div className={styles.Item__rowsContainer}>
            <div className={styles.Item__rowsContainer__rows}>
              {item.items.map((i) => (
                <div
                  className={styles.Item__rowsContainer__rows__row}
                  key={i.id}
                >
                  <Text className={styles.Item__rowsContainer__rows__row__text}>
                    {i.name}
                  </Text>
                  <Text className={styles.Item__rowsContainer__rows__row__price}>
                    {i.count * i.price} ₽
                  </Text>
                </div>
              ))}
            </div>

            <div className={styles.Item__rowsContainer__rows}>
              {item.decors.map((i) => (
                <div
                  className={styles.Item__rowsContainer__rows__row}
                  key={i.id}
                >
                  <Text className={styles.Item__rowsContainer__rows__row__text}>
                    {i.name}
                  </Text>
                  <Text className={styles.Item__rowsContainer__rows__row__price}>
                    {Number(i.count) * Number(i.pricePerUnit)} ₽
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}

        <Text>{allPrice} ₽</Text>
      </div>
    </ComponentStyleWrapper>
  );
};

export default OrdersItem;
