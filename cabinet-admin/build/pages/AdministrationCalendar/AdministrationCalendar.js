import React, { useEffect, useMemo, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import calendarApi from 'src/api/requests/calendarApi';
import { getMonthData } from 'src/pages/AdministrationCalendar/useAdministrationCalendar';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationCalendar.module.styl';
import cn from 'classnames/bind';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import { Button } from '@consta/uikit/Button';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { add, getMonth, sub } from 'date-fns';
import { rusMonths } from 'src/utils/constants';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { Modal } from '@consta/uikit/Modal';
import AdministrationOrderModal from 'src/pages/AdministrationOrders/AdministrationOrderModal/AdministrationOrderModal';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
const weekDayNames = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
];
const cx = cn.bind(styles);
const AdministrationCalendar = () => {
    const [calendar, setCalendar] = useState([]);
    const [date, setDate] = useState(new Date());
    const { load: fetchCalendar } = useRequest(calendarApi.getCalendar, (data) => {
        if (data) {
            setCalendar(data.data);
        }
    });
    const [activeOrder, setActiveOrder] = useState(null);
    const [modal, setModal] = useState(false);
    const month = useMemo(() => {
        return getMonth(date);
    }, [date]);
    useEffect(() => {
        fetchCalendar(date.toISOString());
    }, [date]);
    const datesCells = useMemo(() => {
        if (calendar && calendar.length > 0) {
            const monthData = getMonthData(date.getFullYear(), date.getMonth());
            return monthData.flat().map((d) => {
                if (d !== undefined) {
                    const calendarItem = calendar.filter((itm) => new Date(itm.date).toLocaleDateString() ===
                        new Date(d).toLocaleDateString());
                    if (calendarItem.length > 0) {
                        return { date: d, orders: calendarItem[0].orders };
                    }
                    else
                        return { date: d, orders: [] };
                }
                else
                    return undefined;
            });
        }
        else
            return [];
    }, [calendar]);
    return (React.createElement(MainWrapper, null,
        React.createElement("section", { className: styles.Calendar },
            React.createElement("div", { className: styles.Calendar__headerChange },
                React.createElement(Text, { size: '3xl' }, "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C \u0437\u0430\u043A\u0430\u0437\u043E\u0432"),
                React.createElement("div", { className: styles.Calendar__actions },
                    React.createElement(Button, { iconLeft: IconArrowLeft, form: 'round', onClick: () => setDate((prevState) => {
                            return sub(prevState, { months: 1 });
                        }) }),
                    React.createElement(Text, { size: '2xl' }, date ? rusMonths[month] : null),
                    React.createElement(Button, { iconLeft: IconArrowRight, form: 'round', onClick: () => setDate((prevState) => {
                            return add(prevState, { months: 1 });
                        }) }))),
            React.createElement("header", { className: styles.Calendar__calendarHeader }, weekDayNames.map((name, index) => (React.createElement(Text, { key: `${name}/${index}` }, name)))),
            React.createElement("div", { className: styles.Calendar__cells }, datesCells.map((cell, idx) => (React.createElement("div", { key: idx }, cell === undefined ? (React.createElement("div", { className: styles.Calendar__cells__voidCell })) : (React.createElement("div", { className: styles.Calendar__cells__ordersCell },
                React.createElement(Text, null, new Date(cell.date).toLocaleDateString()),
                cell.orders.length > 0 && (React.createElement("div", { className: styles.Calendar__cells__ordersCell__statuses }, cell.orders.map((ord, ordIdx) => (React.createElement("div", { className: cx(styles.Calendar__cells__orderStatus, {
                        created: ord.status === OrderProcessingStatusEnum.CREATED,
                        consideration: ord.status ===
                            OrderProcessingStatusEnum.CONSIDERATION,
                        inWork: ord.status === OrderProcessingStatusEnum.IN_WORK,
                        ready: ord.status === OrderProcessingStatusEnum.READY,
                        completed: ord.status ===
                            OrderProcessingStatusEnum.COMPLETED,
                        rejected: ord.status === OrderProcessingStatusEnum.REJECTED,
                        delivery: ord.status === OrderProcessingStatusEnum.DELIVERY,
                    }), key: ordIdx, onClick: () => {
                        setActiveOrder(ord);
                        setModal(true);
                    } }, ord.name))))))))))),
            React.createElement(Modal, { isOpen: modal, onClickOutside: () => setModal(false) },
                React.createElement(AdministrationOrderModal, { onClose: () => {
                        setModal(false);
                    }, order: activeOrder })))));
};
export default AdministrationCalendar;
//# sourceMappingURL=AdministrationCalendar.js.map