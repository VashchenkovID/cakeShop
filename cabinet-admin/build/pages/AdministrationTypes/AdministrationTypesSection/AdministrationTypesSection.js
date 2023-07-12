import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesSection.module.styl';
import AdministrationTypesDecorItem from 'src/pages/AdministrationTypes/AdministrationTypesDecorItem/AdministrationTypesDecorItem';
import AdministrationTypesItem from 'src/pages/AdministrationTypes/AdministrationTypesItem/AdministrationTypesItem';
import { Button } from '@consta/uikit/Button';
const AdministrationTypesSection = ({ title, items, isDecor, onCreate, type, setEdit, setModal, clear, }) => {
    return (React.createElement("div", { className: styles.Section },
        React.createElement(Text, { size: '2xl' }, title),
        React.createElement(Button, { size: 's', label: 'Создать', onClick: () => {
                clear();
                onCreate();
            } }),
        React.createElement("div", { className: styles.Section__rows },
            isDecor && (React.createElement("div", { className: styles.DecorItem },
                React.createElement(Text, null, "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"),
                React.createElement(Text, null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E"),
                React.createElement(Text, null, "\u0415\u0434\u0438\u043D\u0438\u0446\u0430 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F"),
                React.createElement(Text, null, "\u0426\u0435\u043D\u0430 \u0435\u0434\u0438\u043D\u0438\u0446\u044B"),
                React.createElement(Text, null, "\u0426\u0435\u043D\u0430 \u0437\u0430\u043A\u0443\u043F\u043A\u0438 \u0435\u0434\u0438\u043D\u0438\u0446\u044B"),
                React.createElement("div", null))),
            isDecor
                ? items.map((item, index) => (React.createElement(AdministrationTypesDecorItem, { setEdit: setEdit, setModal: setModal, key: index, item: item, type: type })))
                : items.map((item, index) => (React.createElement(AdministrationTypesItem, { setEdit: setEdit, setModal: setModal, item: item, key: index, type: type }))))));
};
export default AdministrationTypesSection;
//# sourceMappingURL=AdministrationTypesSection.js.map