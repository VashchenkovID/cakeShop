import React from 'react';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import { convertDateWithTime } from 'src/utils/functions';
import styles from './MainPageOrdersItem.module.styl';
import { Text } from '@consta/uikit/Text';
const MainPageOrdersItem = ({ order }) => {
    return (React.createElement("div", { className: styles.Item },
        React.createElement(Text, { size: 's' }, order.name),
        React.createElement(Text, { size: 's' }, convertDateWithTime(order.createdAt)),
        React.createElement(OrderProcessingStatusBadge, { status: order.status })));
};
export default MainPageOrdersItem;
//# sourceMappingURL=MainPageOrdersItem.js.map