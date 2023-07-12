import React, { useMemo } from 'react';
import styles from './AdministrationOrdersProcessingCard.module.styl';
import { Draggable } from 'react-beautiful-dnd';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import ordersApi from 'src/api/requests/ordersApi';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import { Button } from '@consta/uikit/Button';
import CustomTextTooltip from 'src/components/CustomTextTooltip';
const AdministrationOrdersProcessingCard = ({ item, index, setOrders, setModal, setActiveElement, }) => {
    const newStatus = () => {
        switch (item.status) {
            case OrderProcessingStatusEnum.CREATED:
                return OrderProcessingStatusEnum.CONSIDERATION;
            case OrderProcessingStatusEnum.CONSIDERATION:
                return OrderProcessingStatusEnum.IN_WORK;
            case OrderProcessingStatusEnum.IN_WORK:
                return OrderProcessingStatusEnum.READY;
            case OrderProcessingStatusEnum.READY:
                return OrderProcessingStatusEnum.DELIVERY;
            case OrderProcessingStatusEnum.DELIVERY:
                return OrderProcessingStatusEnum.COMPLETED;
            case OrderProcessingStatusEnum.REJECTED:
                return OrderProcessingStatusEnum.REJECTED;
            default:
                return OrderProcessingStatusEnum.CREATED;
        }
    };
    const updateOrderStatus = async (status) => {
        if (item) {
            await ordersApi
                .updateOrderProcessing(item.id.toString(), {
                type: item.type,
                status: status,
            })
                .then(() => {
                setOrders((prevState) => {
                    return [
                        ...prevState.map((order) => {
                            if (order.id === item.id &&
                                order.name.toLowerCase() === item.name.toLowerCase()) {
                                return { ...order, status: status };
                            }
                            else
                                return { ...order };
                        }),
                    ];
                });
            });
        }
    };
    const allPrice = useMemo(() => {
        return (item.items.reduce((accum, elem) => accum + elem.price * elem.count, 0) +
            item.decors
                .map((decor) => decor.items.reduce((accum, elem) => accum + elem.count * elem.pricePerUnit, 0))
                .reduce((acc, el) => acc + el, 0));
    }, [item]);
    return (React.createElement(Draggable, { draggableId: `${item.dropId}`, index: index }, (provided) => (React.createElement(Card, { ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, className: styles.ProcessingCard },
        React.createElement("div", { className: styles.ProcessingCard__header },
            React.createElement(Text, null,
                item.name,
                React.createElement(Text, { size: 's', view: 'secondary' },
                    "\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438: \u00A0",
                    new Date(item.date_completed).toLocaleDateString())),
            React.createElement("div", null,
                React.createElement(OrderProcessingStatusBadge, { status: item.status }))),
        React.createElement("div", { className: styles.ProcessingCard__content },
            React.createElement("div", { className: styles.ProcessingCard__content__row },
                React.createElement("div", null, "\u0414\u0435\u0441\u0435\u0440\u0442"),
                React.createElement("div", null, "\u0426\u0435\u043D\u0430 \u0437\u0430 \u0435\u0434.")),
            item.items.map((itm, idx) => (React.createElement("div", { className: styles.ProcessingCard__content__row, key: idx },
                React.createElement(CustomTextTooltip, { text: `${itm.name} ${item.decors.length > 0 ? `(С декором)` : ''}`, size: 'm', lineClamp: 1 }),
                React.createElement("div", null,
                    itm.price,
                    " \u20BD"))))),
        React.createElement("div", { className: styles.ProcessingCard__footer },
            React.createElement(Text, { size: 's', weight: 'semibold' },
                "\u0418\u0442\u043E\u0433\u043E: ",
                allPrice,
                "\u20BD"),
            React.createElement(Text, { onClick: () => {
                    setActiveElement({ id: item.id, type: item.type });
                    setModal(true);
                }, size: 'xs', view: 'link' }, "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u043B\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E")),
        React.createElement("footer", { className: styles.ProcessingCard__actions },
            React.createElement(Button, { label: 'Отменить', onClick: () => {
                    updateOrderStatus(OrderProcessingStatusEnum.REJECTED);
                } }),
            React.createElement(Button, { label: 'Следующий шаг', onClick: () => {
                    updateOrderStatus(newStatus());
                } }))))));
};
export default AdministrationOrdersProcessingCard;
//# sourceMappingURL=AdministrationOrdersProcessingCard.js.map