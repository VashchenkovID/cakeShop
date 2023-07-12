import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import ordersApi from 'src/api/requests/ordersApi';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import { Text } from '@consta/uikit/Text';
import MainPageOrdersItem from 'src/pages/MainPage/MainPageOrders/MainPageOrdersItem/MainPageOrdersItem';
import styles from './MainPageOrders.module.styl';
const MainPageOrders = () => {
    const actualDate = new Date();
    const [orders, setOrders] = useState([]);
    const { load: getOrders, isLoading } = useRequest(ordersApi.getOrderProcessing, (r) => {
        if (r) {
            setOrders(r.data.items.map((order, index) => {
                return { ...order, order: index };
            }));
        }
    });
    useEffect(() => {
        getOrders(actualDate.toISOString());
    }, []);
    return (React.createElement(React.Fragment, null, isLoading ? (React.createElement(ScreenLoader, null)) : (React.createElement("div", { className: styles.Orders },
        React.createElement("div", { className: styles.Orders__header },
            React.createElement(Text, null, "\u0417\u0430\u043A\u0430\u0437"),
            React.createElement(Text, null, "\u0421\u043E\u0437\u0434\u0430\u043D"),
            React.createElement(Text, null, "\u0421\u0442\u0430\u0442\u0443\u0441")),
        orders.length > 0 ? (orders
            .slice(0, 10)
            .map((order, index) => (React.createElement(MainPageOrdersItem, { order: order, key: `${order.id}+${index}` })))) : (React.createElement(Text, { align: 'center' }, "\u0417\u0430\u043A\u0430\u0437\u043E\u0432 \u0432 \u0434\u0430\u043D\u043D\u043E\u043C \u043C\u0435\u0441\u044F\u0446\u0435 \u0435\u0449\u0435 \u043D\u0435\u0442"))))));
};
export default MainPageOrders;
//# sourceMappingURL=MainPageOrders.js.map