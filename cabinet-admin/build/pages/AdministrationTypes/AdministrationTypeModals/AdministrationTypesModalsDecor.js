import React from "react";
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import styles from "./AdministrationTypeModals.module.styl";
const AdministrationTypesModalsDecor = ({ decor, setDecor, createNewDecor, onClose, title, isDelete, }) => {
    return (React.createElement(React.Fragment, null, !isDelete ? (React.createElement("div", { className: styles.Container },
        React.createElement(Text, { size: "2xl" }, title),
        React.createElement(TextField, { size: "s", form: "round", label: "Наименование", placeholder: "Введите наименование", value: decor.name, onChange: ({ value }) => setDecor((prev) => {
                return { ...prev, name: value || '' };
            }) }),
        React.createElement(TextField, { size: "s", form: "round", type: "number", label: "Количество в упаковке", placeholder: "Введите количество", value: String(decor.count), onChange: ({ value }) => setDecor((prev) => {
                return { ...prev, count: Number(value) };
            }) }),
        React.createElement(TextField, { size: "s", form: "round", label: "Единица измерения", placeholder: "Введите единицу измерения", value: decor.countType, onChange: ({ value }) => setDecor((prev) => {
                return { ...prev, countType: value || '' };
            }) }),
        React.createElement(TextField, { size: "s", form: "round", label: "Цена за единицу", placeholder: "Введите цену", value: String(decor.pricePerUnit), onChange: ({ value }) => setDecor((prev) => {
                return { ...prev, pricePerUnit: value || '' };
            }) }),
        React.createElement(TextField, { size: "s", form: "round", label: "Цена закупки", placeholder: "Введите цену", value: String(decor.constPrice), onChange: ({ value }) => setDecor((prev) => {
                return { ...prev, constPrice: value || '' };
            }) }),
        React.createElement("div", { className: styles.Container__actions },
            React.createElement(Button, { size: "s", label: "Отмена", onClick: onClose }),
            React.createElement(Button, { size: "s", label: "Сохранить", onClick: () => {
                    createNewDecor().then(() => onClose());
                } })))) : (React.createElement("div", { className: styles.Container },
        React.createElement(Text, { size: "2xl" }, title),
        React.createElement(Text, null,
            "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u0435\u043A\u043E\u0440 ",
            decor.name,
            " ?"),
        React.createElement("div", { className: styles.Container__actions },
            React.createElement(Button, { size: "s", label: "Отмена", onClick: onClose }),
            React.createElement(Button, { size: "s", label: "Удалить", onClick: () => {
                    createNewDecor().then(() => onClose());
                } }))))));
};
export default AdministrationTypesModalsDecor;
//# sourceMappingURL=AdministrationTypesModalsDecor.js.map