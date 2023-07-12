import React from "react";
import { AdministrationTypesModalEnum, } from "../AdministrationTypes";
import { Modal } from "@consta/uikit/Modal";
import AdministrationTypesModalsType from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalsType";
import AdministrationTypesModalsFilling from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalsFilling";
import styles from "src/pages/AdministrationTypes/AdministrationTypes.module.styl";
import AdministrationTypesModalsBiscuit from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalsBiscuit";
import AdministrationTypesModalsDecor from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalsDecor";
const AdministrationTypesModalList = ({ type, setType, modal, setModal, filling, setFilling, biscuit, setBiscuit, decor, setDecor, createNewType, createNewDecor, createNewFilling, createNewBiscuit, updateDecor, updateFilling, updateType, updateBiscuit, removeDecor, removeType, removeFilling, removeBiscuit, }) => {
    return (React.createElement("div", null,
        React.createElement(Modal, { isOpen: modal === AdministrationTypesModalEnum.TYPE, onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            } },
            React.createElement(AdministrationTypesModalsType, { title: "Создание типа", type: type, setType: setType, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: createNewType })),
        React.createElement(Modal, { isOpen: modal === AdministrationTypesModalEnum.TYPE_EDIT, onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            } },
            React.createElement(AdministrationTypesModalsType, { title: "Редактирование типа", type: type, setType: setType, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: updateType })),
        React.createElement(Modal, { isOpen: modal === AdministrationTypesModalEnum.TYPE_REMOVE, onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            } },
            React.createElement(AdministrationTypesModalsType, { title: "Удаление типа", type: type, setType: setType, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: removeType, isDelete: true })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, isOpen: modal === AdministrationTypesModalEnum.FILLING },
            React.createElement(AdministrationTypesModalsFilling, { title: "Создание начинки", filling: filling, setFilling: setFilling, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: createNewFilling })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, isOpen: modal === AdministrationTypesModalEnum.FILLING_EDIT },
            React.createElement(AdministrationTypesModalsFilling, { title: "Редактирование начинки", filling: filling, setFilling: setFilling, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: updateFilling })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, isOpen: modal === AdministrationTypesModalEnum.FILLING_REMOVE },
            React.createElement(AdministrationTypesModalsFilling, { title: "Удаление начинки", filling: filling, isDelete: true, setFilling: setFilling, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: removeFilling })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, className: styles.Modal, isOpen: modal === AdministrationTypesModalEnum.BISCUIT },
            React.createElement(AdministrationTypesModalsBiscuit, { title: "Создание бисквита", biscuit: biscuit, setBiscuit: setBiscuit, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: createNewBiscuit })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, className: styles.Modal, isOpen: modal === AdministrationTypesModalEnum.BISCUIT_EDIT },
            React.createElement(AdministrationTypesModalsBiscuit, { title: "Редактирование бисквита", biscuit: biscuit, setBiscuit: setBiscuit, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: updateBiscuit })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, className: styles.Modal, isOpen: modal === AdministrationTypesModalEnum.BISCUIT_REMOVE },
            React.createElement(AdministrationTypesModalsBiscuit, { title: "Удаление бисквита", biscuit: biscuit, setBiscuit: setBiscuit, onClose: () => setModal(AdministrationTypesModalEnum.IDLE), onSave: removeBiscuit, isDelete: true })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, isOpen: modal === AdministrationTypesModalEnum.DECOR },
            React.createElement(AdministrationTypesModalsDecor, { title: "Создание декора", decor: decor, setDecor: setDecor, createNewDecor: createNewDecor, onClose: () => setModal(AdministrationTypesModalEnum.IDLE) })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, isOpen: modal === AdministrationTypesModalEnum.DECOR_EDIT },
            React.createElement(AdministrationTypesModalsDecor, { title: "Редактирование декора", decor: decor, setDecor: setDecor, createNewDecor: updateDecor, onClose: () => setModal(AdministrationTypesModalEnum.IDLE) })),
        React.createElement(Modal, { onClickOutside: () => {
                setModal(AdministrationTypesModalEnum.IDLE);
            }, isOpen: modal === AdministrationTypesModalEnum.DECOR_REMOVE },
            React.createElement(AdministrationTypesModalsDecor, { title: "Удаление декора", decor: decor, setDecor: setDecor, createNewDecor: removeDecor, isDelete: true, onClose: () => setModal(AdministrationTypesModalEnum.IDLE) }))));
};
export default AdministrationTypesModalList;
//# sourceMappingURL=AdministrationTypesModalList.js.map