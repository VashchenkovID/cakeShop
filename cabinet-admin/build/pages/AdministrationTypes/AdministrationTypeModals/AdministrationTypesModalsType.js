import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import styles from './AdministrationTypeModals.module.styl';
import { Text } from '@consta/uikit/Text';
const AdministrationTypesModalsType = ({ type, setType, onClose, onSave, title, isDelete, }) => {
    return (React.createElement(React.Fragment, null, !isDelete ? (React.createElement("div", { className: styles.Container },
        React.createElement(Text, { size: '2xl' }, title),
        React.createElement(TextField, { size: 's', form: 'round', label: 'Название', placeholder: 'Название', value: type.name, onChange: (e) => {
                setType((prevState) => {
                    return { ...prevState, name: e.value || '' };
                });
            } }),
        React.createElement("div", { className: styles.Container__actions },
            React.createElement(Button, { size: 's', label: 'Отмена', onClick: onClose }),
            React.createElement(Button, { size: 's', label: 'Сохранить', onClick: () => {
                    onSave().then(() => onClose());
                } })))) : (React.createElement("div", { className: styles.Container },
        React.createElement(Text, { size: '2xl' }, title),
        React.createElement(Text, null,
            "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0438\u043F ",
            type.name,
            " ?"),
        React.createElement("div", { className: styles.Container__actions },
            React.createElement(Button, { size: 's', label: 'Отмена', onClick: onClose }),
            React.createElement(Button, { size: 's', label: 'Удалить', onClick: () => {
                    onSave().then(() => onClose());
                } }))))));
};
export default AdministrationTypesModalsType;
//# sourceMappingURL=AdministrationTypesModalsType.js.map