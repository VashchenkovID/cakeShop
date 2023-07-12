import React, { useState } from 'react';
import styles from './MainPage.module.styl';
import { Text } from '@consta/uikit/Text';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import ComponentStyleWrapper from 'src/components/ComponentStyleWrapper/ComponentStyleWrapper';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
import MainPageOrders from 'src/pages/MainPage/MainPageOrders/MainPageOrders';
import MainPageSales from 'src/pages/MainPage/MainPageSales/MainPageSales';
import MainPageTodoList from 'src/pages/MainPage/MainPageTodoList/MainPageTodoList';
import MainPageUsers from 'src/pages/MainPage/MainPageUsers/MainPageUsers';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import MainPageCreateOrderModal from 'src/pages/MainPage/MainPageCreateOrderModal/MainPageCreateOrderModal';
const MainPage = () => {
    const userName = localStorage.getItem(LocalStorageKeysEnum.NAME);
    const [modal, setModal] = useState(false);
    const openOrderCreate = () => {
        setModal(true);
    };
    return (React.createElement(MainWrapper, null,
        React.createElement(Text, { size: '3xl' },
            "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C, ",
            userName,
            "!"),
        React.createElement("section", { className: styles.General },
            React.createElement(ComponentStyleWrapper, null,
                React.createElement("div", { className: styles.General__ordersHeader },
                    React.createElement(Text, { size: 'l' }, "\u0411\u043B\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u044B"),
                    React.createElement(Button, { label: 'Зарегистрировать новый заказ', size: 'xs', onClick: openOrderCreate })),
                React.createElement(MainPageOrders, null)),
            React.createElement(ComponentStyleWrapper, null,
                React.createElement(MainPageTodoList, null)),
            React.createElement(ComponentStyleWrapper, null,
                React.createElement(Text, { size: 'l' }, "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F"),
                React.createElement(MainPageUsers, null)),
            React.createElement(ComponentStyleWrapper, null,
                React.createElement(Text, { size: 'l' }, "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u0440\u043E\u0434\u0430\u0436"),
                React.createElement(MainPageSales, null))),
        React.createElement(Modal, { isOpen: modal },
            React.createElement(MainPageCreateOrderModal, { modal: modal, setModal: setModal }))));
};
export default MainPage;
//# sourceMappingURL=MainPage.js.map