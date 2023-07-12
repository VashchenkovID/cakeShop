import React, { useEffect, useMemo, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import ordersApi from 'src/api/requests/ordersApi';
import styles from './AdministrationOrders.module.styl';
import AdministrationOrdersSideMenu from 'src/pages/AdministrationOrders/AdministrationOrdersSideMenu/AdministrationOrdersSideMenu';
import CustomMonthPicker from 'src/components/CustomMonthPicker/CustomMonthPicker';
import { Loader } from '@consta/uikit/Loader';
import AdministrationOrdersViewById from 'src/pages/AdministrationOrders/AdministrationOrdersViewById/AdministrationOrdersViewById';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
const AdministrationOrders = () => {
    const [date, setDate] = useState(new Date());
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState(null);
    const [activeElement, setActiveElement] = useState(null);
    const { load: getOrders, isLoading } = useRequest(ordersApi.getHistory, (r) => {
        if (r) {
            setOrders(r.data.items.map((order, index) => {
                return { ...order, order: index };
            }));
        }
    }, (err) => { });
    const { load: getHistoryOrder, isLoading: isFullLoading } = useRequest(ordersApi.getHistoryOrder, (r) => {
        if (r) {
            setOrder(r.data);
        }
    });
    const setNull = (param) => {
        setActiveElement(param);
        setOrder(null);
    };
    const activeOrder = useMemo(() => {
        if (activeElement || activeElement === 0) {
            return orders.find((elem) => elem.dropId === activeElement);
        }
        else
            return null;
    }, [activeElement]);
    useEffect(() => {
        getOrders(date.toISOString());
    }, [date]);
    useEffect(() => {
        if (activeOrder) {
            getHistoryOrder(activeOrder.id.toString(), activeOrder.type);
        }
    }, [activeOrder]);
    return (React.createElement(MainWrapper, { title: 'История заказов' },
        React.createElement("section", { className: styles.Orders },
            React.createElement("div", { className: styles.Orders__leftSide },
                React.createElement("div", { onClick: () => setActiveElement(null) },
                    React.createElement(CustomMonthPicker, { setNull: setNull, date: date, setDate: setDate })),
                isLoading ? (React.createElement(Loader, null)) : (React.createElement(AdministrationOrdersSideMenu, { activeElement: activeElement, setActiveElement: setActiveElement, orders: orders }))),
            React.createElement(AdministrationOrdersViewById, { order: order, isFullLoading: isFullLoading, setNull: setNull, activeOrder: activeOrder, getOrders: getOrders, date: date }))));
};
export default AdministrationOrders;
//# sourceMappingURL=AdministrationOrders.js.map