import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationOrdersSideMenuItem.module.styl';
import cn from 'classnames/bind';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
const cx = cn.bind(styles);
const AdministrationOrdersSideMenuItem = ({ order, activeElement, setActiveElement, }) => {
    return (React.createElement("div", { onClick: () => {
            setActiveElement(order.dropId);
        }, className: styles.Item },
        React.createElement("div", null,
            React.createElement(Text, { className: cx(styles.Item__text, {
                    active: activeElement === order.dropId,
                }), weight: 'semibold' }, order.name),
            React.createElement(Text, { view: 'secondary' },
                "\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438: ",
                new Date(order.date_completed).toLocaleDateString())),
        React.createElement(OrderProcessingStatusBadge, { status: order.status })));
};
export default AdministrationOrdersSideMenuItem;
//# sourceMappingURL=AdministrationOrdersSideMenuItem.js.map