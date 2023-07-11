import React, { useEffect, useState } from "react";
import useRequest from "src/hooks/useRequest";
import ordersApi from "src/api/requests/ordersApi";
import PaginationCustom from "src/components/PaginationCustom/PaginationCustom";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import OrdersItem from "src/pages/Orders/OrdersItem/OrdersItem";
import { useResize } from "src/hooks/useResize";
import styles from "./Orders.module.styl";
import { Loader } from "@consta/uikit/Loader";
const Orders = () => {
    const { width } = useResize();
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 100,
    });
    const [count, setCount] = useState(0);
    const { load: fetchOrders, isLoading } = useRequest(ordersApi.getUserOrders, (data) => {
        if (data) {
            setOrders(data.data.rows);
            setCount(data.data.count);
        }
    });
    useEffect(() => {
        fetchOrders({ limit: pagination.perPage, page: pagination.page });
    }, [pagination]);
    return (React.createElement("div", { className: styles.Orders },
        React.createElement(ComponentStyleWrapper, null,
            React.createElement("div", { className: styles.Orders__body },
                React.createElement(Text, { size: "3xl" }, "\u041C\u043E\u0438 \u0437\u0430\u043A\u0430\u0437\u044B"),
                React.createElement("div", { className: styles.Orders__items }, !isLoading && orders.length > 0 &&
                    orders.map((item, index) => (React.createElement(OrdersItem, { item: item, key: `${item.id}_${index}`, width: width })))),
                isLoading && React.createElement(Loader, null),
                React.createElement(PaginationCustom, { className: styles.Orders__pagination, total: count, pagination: pagination, setPagination: setPagination })))));
};
export default Orders;
//# sourceMappingURL=Orders.js.map