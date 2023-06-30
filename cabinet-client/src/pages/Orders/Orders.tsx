import React, { useEffect, useState } from "react";
import useRequest from "src/hooks/useRequest";
import ordersApi from "src/api/requests/ordersApi";
import { OrderModel } from "src/api/models/OrderModel";
import { PaginationStateType } from "src/components/PaginationCustom/PaginationCustom";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import OrdersItem from "src/pages/Orders/OrdersItem/OrdersItem";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    perPage: 10,
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
  return (
    <div>
      <ComponentStyleWrapper>
        <Text size={"3xl"}>Мои заказы</Text>
        <div>
          {orders.length > 0 &&
            orders.map((item, index) => (
              <OrdersItem item={item} key={`${item.id}_${index}`} />
            ))}
        </div>
      </ComponentStyleWrapper>
    </div>
  );
};

export default Orders;
