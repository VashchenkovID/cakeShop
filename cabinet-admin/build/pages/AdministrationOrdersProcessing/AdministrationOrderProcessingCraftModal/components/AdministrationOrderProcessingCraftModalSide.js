import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from '../AdministrationOrderProcessingCraftModal.module.styl';
const AdministrationOrderProcessingCraftModalSide = ({ activeFullItem }) => {
    console.log(activeFullItem);
    return (React.createElement("div", { className: styles.ModalContainer__content__rightSide },
        React.createElement(Text, { size: '2xl' }, activeFullItem.name),
        React.createElement("div", { className: styles.ModalContainer__content__rightSide__recipe },
            React.createElement(Text, { size: 'l' }, "\u0420\u0435\u0446\u0435\u043F\u0442"),
            React.createElement("div", { className: styles.ModalContainer__content__rightSide__recipe__row },
                React.createElement(Text, null, "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"),
                React.createElement(Text, null, "\u041A\u043E\u043B-\u0432\u043E"),
                React.createElement(Text, null, "\u0415\u0434-\u0438\u0437\u043C")),
            activeFullItem.items.map((itm, idx) => (React.createElement("div", { className: styles.ModalContainer__content__rightSide__recipe__row, key: idx },
                React.createElement(Text, null, itm.name),
                React.createElement(Text, null, itm.weight),
                React.createElement(Text, null, itm.weightType)))))));
};
export default AdministrationOrderProcessingCraftModalSide;
//# sourceMappingURL=AdministrationOrderProcessingCraftModalSide.js.map