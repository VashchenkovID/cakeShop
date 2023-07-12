import React, { useState } from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';
import { TextField } from '@consta/uikit/TextField';
import PhoneInput from 'react-phone-input-2';
import { IconAdd } from '@consta/uikit/IconAdd';
const MainPageCreateOrderModal = ({ modal, setModal, }) => {
    const [state, setState] = useState({
        date_completed: null,
        name: '',
        customer: {
            fullName: '',
            email: '',
            phone: '',
        },
        items: [],
    });
    const [init, setInit] = useState();
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(Text, { size: 'l' }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043D\u043E\u0432\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430"),
            React.createElement(Button, { view: 'clear', iconLeft: IconClose })),
        React.createElement("section", null,
            React.createElement(TextField, { required: true, label: 'Наименование', placeholder: 'Введите наименование заказа', value: state.name, onChange: ({ value }) => setState((prev) => {
                    return { ...prev, name: value || '' };
                }) }),
            React.createElement("div", null,
                React.createElement(Text, null, "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C"),
                React.createElement(TextField, { required: true, label: 'Имя', placeholder: 'Введите имя заказчика', value: state.customer.fullName, onChange: ({ value }) => setState((prevState) => {
                        return {
                            ...prevState,
                            customer: { ...prevState.customer, fullName: value || '' },
                        };
                    }) }),
                React.createElement(TextField, { label: 'Почта (необязательно)', placeholder: 'Введите почтовый адрес', value: state.customer.email, onChange: ({ value }) => setState((prevState) => {
                        return {
                            ...prevState,
                            customer: { ...prevState.customer, email: value || '' },
                        };
                    }) }),
                React.createElement(PhoneInput, { value: state.customer.phone, onChange: (value) => setState((prevState) => {
                        return {
                            ...prevState,
                            customer: { ...prevState.customer, phone: value },
                        };
                    }) })),
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(Text, null, "\u0414\u0435\u0441\u0435\u0440\u0442\u044B"),
                    React.createElement(Button, { label: 'Добавить', iconLeft: IconAdd }))))));
};
export default MainPageCreateOrderModal;
//# sourceMappingURL=MainPageCreateOrderModal.js.map