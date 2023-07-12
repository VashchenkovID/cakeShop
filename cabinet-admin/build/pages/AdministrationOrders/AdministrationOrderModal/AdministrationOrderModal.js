import React, { useMemo } from "react";
import styles from "./AdministrationOrderModal.module.styl";
import { Text } from "@consta/uikit/Text";
import { User } from "@consta/uikit/User";
import OrderProcessingStatusBadge from "src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge";
import { Button } from "@consta/uikit/Button";
const AdministrationOrderModal = ({ onClose, order, }) => {
    const fullPrice = useMemo(() => {
        if (order) {
            return order.items.reduce((accum, elem) => accum + elem.price, 0);
        }
        else
            return null;
    }, [order]);
    return (React.createElement(React.Fragment, null, order && (React.createElement("div", { className: styles.Container },
        React.createElement("div", { className: styles.Container__header },
            React.createElement("div", null,
                React.createElement(Text, { size: "3xl" }, order.name),
                React.createElement(User, { size: "l", name: order.customer, info: order.customer_phone }),
                React.createElement(Text, { view: "secondary" },
                    "\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438:",
                    " ",
                    new Date(order.date_completed).toLocaleDateString())),
            React.createElement(OrderProcessingStatusBadge, { status: order.status })),
        React.createElement("div", { className: styles.Container__rows }, order.items.map((item, index) => (React.createElement("div", { className: styles.Container__rows__row, key: index },
            React.createElement("div", null, item.name),
            React.createElement("div", null,
                item.count,
                "\u0448\u0442"),
            React.createElement("div", null,
                item.price,
                " \u20BD"))))),
        React.createElement("div", { className: styles.Container__footer }, fullPrice && React.createElement(Text, { size: "2xl" },
            "\u0418\u0442\u043E\u0433\u043E: ",
            fullPrice,
            " \u20BD")),
        React.createElement(Button, { label: "Закрыть", onClick: onClose })))));
};
export default AdministrationOrderModal;
//# sourceMappingURL=AdministrationOrderModal.js.map