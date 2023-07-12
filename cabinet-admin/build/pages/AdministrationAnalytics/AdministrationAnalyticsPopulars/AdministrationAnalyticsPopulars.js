import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import analyticsApi from 'src/api/requests/analyticsApi';
import { Text } from '@consta/uikit/Text';
import { IconArrowUp } from '@consta/uikit/IconArrowUp';
import styles from './AdministrationAnalyticsPopulars.module.styl';
import { Loader } from '@consta/uikit/Loader';
const AdministrationAnalyticsPopulars = ({ date, }) => {
    const [populars, setPopulars] = useState([]);
    const { load: fetchPopulars, isLoading } = useRequest(analyticsApi.getOrderProcessing, (data) => {
        if (data) {
            setPopulars(data.data.items);
        }
    });
    useEffect(() => {
        fetchPopulars(date.toISOString());
    }, [date]);
    return (React.createElement("div", { className: styles.Popular },
        React.createElement(Text, { size: '3xl' }, "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u0434\u0435\u0441\u0435\u0440\u0442\u043E\u0432 \u0437\u0430 \u043C\u0435\u0441\u044F\u0446"),
        React.createElement("div", { className: styles.Popular__rows__row },
            React.createElement(Text, { weight: 'semibold' }, "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"),
            React.createElement(Text, { weight: 'semibold' }, "\u041F\u0440\u0438\u0431\u044B\u043B\u044C"),
            React.createElement(Text, { weight: 'semibold' }, "\u041A\u0443\u043F\u043B\u0435\u043D\u043E \u0437\u0430 \u043C\u0435\u0441\u044F\u0446")),
        !isLoading && populars.length > 0 && (React.createElement("div", { className: styles.Popular__rows }, populars
            .sort((a, b) => b.count - a.count)
            .map((item, index) => (React.createElement("div", { className: styles.Popular__rows__row, key: index },
            React.createElement(Text, { weight: 'semibold', className: styles.Popular__rowPopular, style: { color: item.popularity ? '#51dd00' : '' } },
                item.name,
                item.popularity ? (React.createElement(IconArrowUp, { className: styles.Popular__rowPopular__color })) : null),
            React.createElement(Text, null,
                item.price,
                " \u20BD"),
            React.createElement(Text, null,
                item.count,
                " \u0448\u0442")))))),
        isLoading && React.createElement(Loader, null),
        populars.length === 0 && (React.createElement(Text, { align: 'center' }, "\u0414\u0430\u043D\u043D\u044B\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442"))));
};
export default AdministrationAnalyticsPopulars;
//# sourceMappingURL=AdministrationAnalyticsPopulars.js.map