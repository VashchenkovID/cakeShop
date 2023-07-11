import React, { useMemo } from "react";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import OrderStatusBadge from "src/components/OrderStatusBadge/OrderStatusBadge";
import styles from "./OrdersItem.module.styl";
const OrdersItem = ({ item, width }) => {
    const allPrice = useMemo(() => {
        return (item.items.reduce((acc, elem) => acc + elem.price * elem.count, 0) +
            item.decors.reduce((acc, elem) => acc + Number(elem.count) * Number(elem.pricePerUnit), 0));
    }, [item]);
    return (React.createElement(ComponentStyleWrapper, null,
        React.createElement("div", { className: styles.Item },
            React.createElement("div", { className: styles.Item__header },
                React.createElement(Text, { size: width <= 500 ? "s" : "m" },
                    `${item.name} от ${new Date(item.createdAt).toLocaleDateString()}`,
                    React.createElement(Text, { size: width <= 500 ? "xs" : "s", view: "secondary" },
                        "\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438: ",
                        new Date(item.date_completed).toLocaleDateString())),
                React.createElement(OrderStatusBadge, { status: item.status })),
            allPrice !== 0 && (React.createElement("div", { className: styles.Item__rowsContainer },
                React.createElement("div", { className: styles.Item__rowsContainer__rows }, item.items.map((i) => (React.createElement("div", { className: styles.Item__rowsContainer__rows__row, key: i.id },
                    React.createElement(Text, { className: styles.Item__rowsContainer__rows__row__text }, i.name),
                    React.createElement(Text, { className: styles.Item__rowsContainer__rows__row__price },
                        i.count * i.price,
                        " \u20BD"))))),
                React.createElement("div", { className: styles.Item__rowsContainer__rows }, item.decors.map((i) => (React.createElement("div", { className: styles.Item__rowsContainer__rows__row, key: i.id },
                    React.createElement(Text, { className: styles.Item__rowsContainer__rows__row__text }, i.name),
                    React.createElement(Text, { className: styles.Item__rowsContainer__rows__row__price },
                        Number(i.count) * Number(i.pricePerUnit),
                        " \u20BD"))))))),
            React.createElement(Text, null,
                allPrice,
                " \u20BD"))));
};
export default OrdersItem;
//# sourceMappingURL=OrdersItem.js.map