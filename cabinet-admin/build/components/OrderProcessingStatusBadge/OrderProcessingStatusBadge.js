import React from 'react';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import styles from './OrderProcessingStatusBadge.module.styl';
import cn from 'classnames/bind';
var OrderProcessingStatusEnumRus;
(function (OrderProcessingStatusEnumRus) {
    OrderProcessingStatusEnumRus["CREATED"] = "\u041D\u043E\u0432\u044B\u0439";
    OrderProcessingStatusEnumRus["CONSIDERATION"] = "\u041D\u0430 \u0440\u0430\u0441\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u0438\u0438";
    OrderProcessingStatusEnumRus["IN_WORK"] = "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435";
    OrderProcessingStatusEnumRus["READY"] = "\u0413\u043E\u0442\u043E\u0432";
    OrderProcessingStatusEnumRus["DELIVERY"] = "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430";
    OrderProcessingStatusEnumRus["COMPLETED"] = "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D";
    OrderProcessingStatusEnumRus["REJECTED"] = "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D";
    OrderProcessingStatusEnumRus["idle"] = "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E";
})(OrderProcessingStatusEnumRus || (OrderProcessingStatusEnumRus = {}));
const cx = cn.bind(styles);
const OrderProcessingStatusBadge = ({ status }) => {
    return (React.createElement("div", { className: cx(styles.container, {
            created: status === OrderProcessingStatusEnum.CREATED,
            consideration: status === OrderProcessingStatusEnum.CONSIDERATION,
            inWork: status === OrderProcessingStatusEnum.IN_WORK,
            ready: status === OrderProcessingStatusEnum.READY,
            completed: status === OrderProcessingStatusEnum.COMPLETED,
            rejected: status === OrderProcessingStatusEnum.REJECTED,
            delivery: status === OrderProcessingStatusEnum.DELIVERY,
        }) }, OrderProcessingStatusEnumRus[status]));
};
export default OrderProcessingStatusBadge;
//# sourceMappingURL=OrderProcessingStatusBadge.js.map