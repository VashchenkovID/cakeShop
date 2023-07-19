import React, { useEffect, useState } from "react";
import useRequest from "src/hooks/useRequest";
import ordersApi from "src/api/requests/ordersApi";
import { OrderModel } from "src/api/models/OrderModel";
import PaginationCustom, {
  PaginationStateType,
} from "src/components/PaginationCustom/PaginationCustom";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import OrdersItem from "src/pages/Orders/OrdersItem/OrdersItem";
import { useResize } from "src/hooks/useResize";
import styles from "./Orders.module.styl";
import {Loader} from "@consta/uikit/Loader";
import TransitionWrapper from "src/components/TransitionWrapper/TransitionWrapper";

const Orders: React.FC = () => {
  const { width } = useResize();
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    perPage: 100,
  });
  const [count, setCount] = useState(0);
  const { load: fetchOrders, isLoading } = useRequest(
    ordersApi.getUserOrders,
    (data) => {
      if (data) {
        setOrders(data.data.rows);
        setCount(data.data.count);
      }
    }
  );
  useEffect(() => {
    fetchOrders({ limit: pagination.perPage, page: pagination.page });
  }, [pagination]);
  return (<TransitionWrapper>
        <div className={styles.Orders}>
          <ComponentStyleWrapper>
            <div className={styles.Orders__body}>
              <Text size={"3xl"}>Мои заказы</Text>
              <div className={styles.Orders__items}>
                {!isLoading && orders.length > 0 &&
                    orders.map((item, index) => (
                        <OrdersItem
                            item={item}
                            key={`${item.id}_${index}`}
                            width={width}
                        />
                    ))}
              </div>
              {isLoading && <Loader />}
              <PaginationCustom className={styles.Orders__pagination} total={count} pagination={pagination} setPagination={setPagination} />

            </div>

          </ComponentStyleWrapper>
        </div>
      </TransitionWrapper>

  );
};

export default Orders;
