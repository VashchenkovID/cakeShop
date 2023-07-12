import React from 'react';
import { Line } from '@consta/charts/Line';
import styles from './AdministrationAnalyticsSalesGraph.module.styl';
import { Text } from '@consta/uikit/Text';
import { Loader } from '@consta/uikit/Loader';
const AdministrationAnalyticsSalesGraph = ({ lineGraphData, isLoading, items, }) => {
    return (React.createElement("div", { className: styles.Graph },
        React.createElement(Text, { size: '3xl' }, "\u0421\u0442\u0430\u0441\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u0440\u043E\u0434\u0430\u0436"),
        isLoading ? (React.createElement(Loader, null)) : (React.createElement(React.Fragment, null, lineGraphData.some((it) => it.id !== null) ? (React.createElement(Line, { data: lineGraphData, xField: 'date_completed', yField: 'allPrice', className: styles.line, seriesField: "type", color: ['#51dd00', '#fa2e00'], tooltip: {
                fields: ['name', 'allPrice'],
                formatter: (datum) => {
                    return {
                        name: `${datum.name}`,
                        value: `${datum.allPrice} ₽`,
                    };
                },
            } })) : (React.createElement(Text, { align: 'center' }, "\u0414\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0433\u0440\u0430\u0444\u0438\u043A\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442")))),
        !isLoading && (React.createElement("div", { className: styles.Graph__rows },
            React.createElement("div", { className: styles.Graph__rows__row },
                React.createElement(Text, { weight: 'semibold' }, "\u0422\u0438\u043F \u0437\u0430\u043A\u0430\u0437\u0430"),
                React.createElement(Text, { weight: 'semibold' }, "\u0418\u043C\u044F"),
                React.createElement(Text, { weight: 'semibold' }, "\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438"),
                React.createElement(Text, { weight: 'semibold' }, "\u041F\u043E\u043B\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"),
                React.createElement(Text, { weight: 'semibold' }, "\u0421\u0435\u0431\u0435\u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C")),
            items.map((item, index) => (React.createElement("div", { className: styles.Graph__rows__row, key: index },
                React.createElement(Text, null, item.type),
                React.createElement(Text, null, item.name),
                React.createElement(Text, null, item.date_completed),
                React.createElement(Text, null,
                    item.allPrice,
                    " \u20BD"),
                React.createElement(Text, null, item.constPrice ? `${item.constPrice} ₽` : '-'))))))));
};
export default AdministrationAnalyticsSalesGraph;
//# sourceMappingURL=AdministrationAnalyticsSalesGraph.js.map