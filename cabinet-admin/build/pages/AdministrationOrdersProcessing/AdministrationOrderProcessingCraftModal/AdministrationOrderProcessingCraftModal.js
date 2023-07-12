import React, { useEffect, useMemo, useState } from 'react';
import styles from './AdministrationOrderProcessingCraftModal.module.styl';
import useRequest from 'src/hooks/useRequest';
import ordersApi from 'src/api/requests/ordersApi';
import { Loader } from '@consta/uikit/Loader';
import { Text } from '@consta/uikit/Text';
import { User } from '@consta/uikit/User';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
const AdministrationOrderProcessingCraftModal = ({ activeElement, }) => {
    const [order, setOrder] = useState(null);
    const { load: getHistoryOrder, isLoading: isFullLoading } = useRequest(ordersApi.getHistoryOrder, (r) => {
        if (r) {
            setOrder(r.data);
        }
    });
    const fullPrice = useMemo(() => {
        if (order) {
            return (order.items.reduce((accum, elem) => accum + elem.price * elem.count, 0) +
                order.decors
                    .map((dec) => dec.items.reduce((acc, el) => acc + el.pricePerUnit * el.count, 0))
                    .reduce((acc, el) => acc + el, 0));
        }
        else
            return null;
    }, [order]);
    useEffect(() => {
        if (activeElement && activeElement.id) {
            getHistoryOrder(activeElement.id.toString(), activeElement.type);
        }
    }, [activeElement]);
    return (React.createElement("div", null,
        isFullLoading && React.createElement(Loader, null),
        !isFullLoading && order && (React.createElement("div", { className: styles.Container },
            React.createElement("div", { className: styles.Container__header },
                React.createElement("div", null,
                    React.createElement(Text, { size: '3xl' }, order.name),
                    React.createElement(User, { size: 'l', name: order.customer, info: order.customer_phone }),
                    React.createElement(Text, { view: 'secondary' },
                        "\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438:",
                        ' ',
                        new Date(order.date_completed).toLocaleDateString())),
                React.createElement(OrderProcessingStatusBadge, { status: order.status })),
            React.createElement("div", { className: styles.Container__rows },
                order.items.map((item, index) => (React.createElement("div", { className: styles.Container__rows__row, key: index },
                    React.createElement("div", null, item.name),
                    React.createElement("div", null,
                        item.count,
                        "\u0448\u0442"),
                    React.createElement("div", null,
                        item.price,
                        " \u20BD")))),
                React.createElement("div", { className: styles.Container__decor }),
                order.decors.map((decor, idx) => (React.createElement("div", { className: styles.Container__rows__decor, key: idx },
                    React.createElement("div", null, decor.name),
                    React.createElement("div", { className: styles.Container__rows__decor__rows },
                        React.createElement("div", { className: styles.Container__rows__decor__rows__decHeader },
                            React.createElement("div", null, "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"),
                            React.createElement("div", null, "\u041A\u043E\u043B-\u0432\u043E"),
                            React.createElement("div", null, "\u0415\u0434.\u0438\u0437\u043C"),
                            React.createElement("div", null, "\u0426\u0435\u043D\u0430 \u0437\u0430 \u0435\u0434"),
                            React.createElement("div", null, "\u0426\u0435\u043D\u0430 \u0437\u0430\u043A\u0443\u043F\u043A\u0438")),
                        decor.items.map((d, i) => (React.createElement("div", { className: styles.Container__rows__decor__rows__decRow, key: i },
                            React.createElement("div", null, d.name),
                            React.createElement("div", null, d.count),
                            React.createElement("div", null, d.countType),
                            React.createElement("div", null,
                                d.pricePerUnit,
                                " \u20BD"),
                            React.createElement("div", null,
                                d.constPrice,
                                " \u20BD"))))))))),
            React.createElement("div", { className: styles.Container__footer }, fullPrice && React.createElement(Text, { size: '2xl' },
                "\u0418\u0442\u043E\u0433\u043E: ",
                fullPrice,
                " \u20BD"))))));
};
export default AdministrationOrderProcessingCraftModal;
//# sourceMappingURL=AdministrationOrderProcessingCraftModal.js.map