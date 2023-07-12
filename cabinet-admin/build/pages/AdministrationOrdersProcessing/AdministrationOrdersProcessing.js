import React, { useEffect, useMemo, useState } from 'react';
import ordersApi from 'src/api/requests/ordersApi';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import styles from './AdministrationOrdersProcessing.module.styl';
import AdministrationOrdersProcessingCard from 'src/pages/AdministrationOrdersProcessing/AdministrationOrdersProcessingCard/AdministrationOrdersProcessingCard';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DatePicker } from '@consta/uikit/DatePicker';
import useRequest from 'src/hooks/useRequest';
import { Loader } from '@consta/uikit/Loader';
import { Modal } from '@consta/uikit/Modal';
import AdministrationOrderProcessingCraftModal from 'src/pages/AdministrationOrdersProcessing/AdministrationOrderProcessingCraftModal/AdministrationOrderProcessingCraftModal';
import InformerBadge from 'src/components/Informer/Informer';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
const ColumnIndexes = [
    { index: 0, value: OrderProcessingStatusEnum.CREATED },
    { index: 1, value: OrderProcessingStatusEnum.CONSIDERATION },
    { index: 2, value: OrderProcessingStatusEnum.IN_WORK },
    { index: 3, value: OrderProcessingStatusEnum.READY },
    { index: 4, value: OrderProcessingStatusEnum.DELIVERY },
];
const AdministrationOrdersProcessing = () => {
    const [date, setDate] = useState(new Date());
    const [modal, setModal] = useState(false);
    const [activeElement, setActiveElement] = useState({ type: '', id: null });
    const [orders, setOrders] = useState([]);
    const [startType, setStartType] = useState(OrderProcessingStatusEnum.IDLE);
    const [startIndex, setStartIndex] = useState(0);
    const { load: getOrders, isLoading } = useRequest(ordersApi.getOrderProcessing, (r) => {
        if (r) {
            setOrders(r.data.items.map((order, index) => {
                return { ...order, order: index };
            }));
        }
    });
    const boardItems = useMemo(() => {
        return [
            {
                title: 'Новый',
                color: '#00BBF0',
                type: OrderProcessingStatusEnum.CREATED,
                items: orders.filter((order) => order.status === OrderProcessingStatusEnum.CREATED),
            },
            {
                title: 'На рассмотрении',
                color: '#00BBF0',
                type: OrderProcessingStatusEnum.CONSIDERATION,
                items: orders.filter((order) => order.status === OrderProcessingStatusEnum.CONSIDERATION),
            },
            {
                title: 'В работе',
                color: '#FFAA64',
                type: OrderProcessingStatusEnum.IN_WORK,
                items: orders.filter((order) => order.status === OrderProcessingStatusEnum.IN_WORK),
            },
            {
                title: 'Готов',
                color: '#17B978',
                type: OrderProcessingStatusEnum.READY,
                items: orders.filter((order) => order.status === OrderProcessingStatusEnum.READY),
            },
            {
                title: 'Доставка',
                color: '#6c6cd5',
                type: OrderProcessingStatusEnum.DELIVERY,
                items: orders.filter((order) => order.status === OrderProcessingStatusEnum.DELIVERY),
            },
        ];
    }, [orders]);
    const [, setMyBoardItems] = useState([]);
    const onDragEnd = async (result) => {
        const { destination, draggableId, source } = result;
        if (!destination)
            return;
        const findColumn = ColumnIndexes.find((col) => col.value === destination.droppableId);
        if (findColumn) {
            if (source.index === startIndex &&
                destination.droppableId === startType) {
                const myColumn = boardItems.find((item) => item.type === destination.droppableId);
                if (myColumn !== undefined) {
                    const myItem = myColumn.items.splice(startIndex, 1);
                    myColumn.items.splice(destination.index, 0, ...myItem);
                    setMyBoardItems([
                        ...boardItems.map((item, index) => {
                            if (index === findColumn.index) {
                                return { ...myColumn };
                            }
                            else
                                return { ...item };
                        }),
                    ]);
                }
            }
        }
        if (destination.droppableId !== startType) {
            setOrders([
                ...orders
                    .map((item) => {
                    if (item.dropId === Number(draggableId)) {
                        return {
                            ...item,
                            status: destination.droppableId,
                            order: destination.index,
                        };
                    }
                    else
                        return { ...item };
                })
                    .sort((a, b) => a.order - b.order),
            ]);
            const reqItem = orders.find((item) => item.dropId === Number(draggableId));
            if (reqItem) {
                await ordersApi.updateOrderProcessing(reqItem.id.toString(), {
                    type: reqItem.type,
                    status: destination.droppableId,
                });
            }
        }
    };
    useEffect(() => {
        getOrders(date.toISOString());
    }, [date]);
    return (React.createElement(MainWrapper, { title: 'Обработка заказов' },
        React.createElement("section", { className: styles.Processing },
            React.createElement(DatePicker, { dropdownClassName: styles.datePickerPopover, label: 'Выберите месяц', labelPosition: 'left', className: styles.Processing__datePicker, size: 's', form: 'round', type: "month", value: date, onChange: (value) => setDate(value.value) }),
            isLoading && (React.createElement("div", { className: styles.loader },
                React.createElement(Loader, null))),
            React.createElement("div", { className: styles.Processing__content }, !isLoading && (React.createElement(DragDropContext, { onDragStart: (start) => {
                    setStartType(start.source.droppableId);
                    setStartIndex(start.source.index);
                }, onDragEnd: onDragEnd }, orders.length > 0 &&
                boardItems.map((board, index) => (React.createElement(Droppable, { droppableId: board.type, key: `${index}_${board.type}` }, (provided) => (React.createElement("div", { ...provided.droppableProps, ref: provided.innerRef, className: styles.Processing__content__column },
                    React.createElement("div", { className: styles.Processing__content__column__header, style: { borderLeft: `10px solid ${board.color}` } },
                        React.createElement("h1", null, board.title)),
                    React.createElement("div", { className: styles.Processing__content__cards }, board.items.map((item, idx) => (React.createElement(AdministrationOrdersProcessingCard, { item: item, key: `${item.id}_${idx}`, index: idx, setOrders: setOrders, setModal: setModal, setActiveElement: setActiveElement })))))))))))),
            React.createElement(Modal, { isOpen: modal, onClickOutside: () => setModal(false) },
                React.createElement(AdministrationOrderProcessingCraftModal, { activeElement: activeElement, modal: modal, setModal: setModal }))),
        orders.length === 0 && (React.createElement(InformerBadge, { text: 'В выбранном месяце заказы отсутствуют' }))));
};
export default React.memo(AdministrationOrdersProcessing);
//# sourceMappingURL=AdministrationOrdersProcessing.js.map