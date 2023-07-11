import React from 'react';
import styles from './OrderStatusBadge.module.styl';
import cn from 'classnames/bind';
export var OrderProcessingStatusEnum;
(function (OrderProcessingStatusEnum) {
    OrderProcessingStatusEnum["CREATED"] = "CREATED";
    OrderProcessingStatusEnum["CONSIDERATION"] = "CONSIDERATION";
    OrderProcessingStatusEnum["IN_WORK"] = "IN_WORK";
    OrderProcessingStatusEnum["READY"] = "READY";
    OrderProcessingStatusEnum["DELIVERY"] = "DELIVERY";
    OrderProcessingStatusEnum["COMPLETED"] = "COMPLETED";
    OrderProcessingStatusEnum["REJECTED"] = "REJECTED";
    OrderProcessingStatusEnum["IDLE"] = "idle";
})(OrderProcessingStatusEnum || (OrderProcessingStatusEnum = {}));
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
const OrderStatusBadge = ({ status }) => {
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
export default OrderStatusBadge;
//# sourceMappingURL=OrderStatusBadge.js.map