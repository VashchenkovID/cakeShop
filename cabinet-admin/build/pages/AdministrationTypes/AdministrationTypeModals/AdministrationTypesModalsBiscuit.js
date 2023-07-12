import React, { useState } from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import styles from './AdministrationTypeModals.module.styl';
import { DragNDropField } from '@consta/uikit/DragNDropField';
import { Text } from '@consta/uikit/Text';
import { Attachment } from '@consta/uikit/Attach';
const AdministrationTypesModalsBiscuit = ({ biscuit, setBiscuit, onClose, onSave, title, isDelete, }) => {
    const [file, setFile] = useState([]);
    const selectFile = (file) => {
        setFile([file]);
        setBiscuit((prev) => {
            return { ...prev, img: file };
        });
    };
    return (React.createElement(React.Fragment, null, !isDelete ? (React.createElement("div", { className: styles.Container },
        React.createElement(Text, { size: '2xl' }, title),
        React.createElement(TextField, { size: 's', form: 'round', label: 'Наименование', placeholder: 'Введите наименование', value: biscuit.name, onChange: (e) => setBiscuit((prevState) => {
                return { ...prevState, name: e.value || '' };
            }) }),
        React.createElement(DragNDropField, { multiple: false, onDropFiles: (file) => {
                selectFile(file[0]);
            } }, ({ openFileDialog }) => (React.createElement("div", { className: styles.Container__files },
            React.createElement(Text, { size: 'l' }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044E \u0434\u0435\u0441\u0435\u0440\u0442\u0430"),
            React.createElement(Text, { size: 's', view: 'secondary' }, "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0444\u0430\u0439\u043B\u044B \u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0432 jpg,png,jpeg"),
            file.map((f) => (React.createElement(Attachment, { key: f.name, fileName: f.name, fileExtension: f.name.match(/\.(?!.*\.)(\w*)/)?.[1], fileDescription: f.type }))),
            React.createElement(Button, { size: 'xs', onClick: openFileDialog, label: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B" })))),
        React.createElement("div", { className: styles.Container__actions },
            React.createElement(Button, { size: 's', label: 'Отмена', onClick: onClose }),
            React.createElement(Button, { size: 's', label: 'Сохранить', onClick: () => {
                    onSave().then(() => onClose());
                } })))) : (React.createElement("div", { className: styles.Container },
        React.createElement(Text, { size: '2xl' }, title),
        React.createElement(Text, null,
            "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C ",
            biscuit.name,
            " ?"),
        React.createElement("div", { className: styles.Container__actions },
            React.createElement(Button, { size: 's', label: 'Отмена', onClick: onClose }),
            React.createElement(Button, { size: 's', label: 'Удалить', onClick: () => {
                    onSave().then(() => onClose());
                } }))))));
};
export default AdministrationTypesModalsBiscuit;
//# sourceMappingURL=AdministrationTypesModalsBiscuit.js.map