import React, { useState } from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesItem.module.styl';
import { Modal } from '@consta/uikit/Modal';
import { AdministrationTypesItemsEnum, AdministrationTypesModalEnum, } from 'src/pages/AdministrationTypes/AdministrationTypes';
import { Button } from '@consta/uikit/Button';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
const AdministrationTypesItem = ({ item, type, setEdit, setModal, }) => {
    const [open, setOpen] = useState(false);
    const openEdit = () => {
        setEdit(type, item);
        switch (type) {
            case AdministrationTypesItemsEnum.TYPE:
                setModal(AdministrationTypesModalEnum.TYPE_EDIT);
                return;
            case AdministrationTypesItemsEnum.FILLING:
                setModal(AdministrationTypesModalEnum.FILLING_EDIT);
                return;
            case AdministrationTypesItemsEnum.BISCUIT:
                setModal(AdministrationTypesModalEnum.BISCUIT_EDIT);
                return;
            case AdministrationTypesItemsEnum.DECOR:
                setModal(AdministrationTypesModalEnum.DECOR_EDIT);
                return;
            default:
                setModal(AdministrationTypesModalEnum.IDLE);
        }
    };
    const openRemove = () => {
        setEdit(type, item);
        switch (type) {
            case AdministrationTypesItemsEnum.TYPE:
                setModal(AdministrationTypesModalEnum.TYPE_REMOVE);
                return;
            case AdministrationTypesItemsEnum.FILLING:
                setModal(AdministrationTypesModalEnum.FILLING_REMOVE);
                return;
            case AdministrationTypesItemsEnum.BISCUIT:
                setModal(AdministrationTypesModalEnum.BISCUIT_REMOVE);
                return;
            case AdministrationTypesItemsEnum.DECOR:
                setModal(AdministrationTypesModalEnum.DECOR_REMOVE);
                return;
            default:
                setModal(AdministrationTypesModalEnum.IDLE);
        }
    };
    return (React.createElement("div", { className: styles.Item },
        React.createElement("div", { className: styles.Item__case },
            item.img && (React.createElement("img", { onClick: () => setOpen(true), style: { width: 60, height: 60, borderRadius: '10px' }, src: `${import.meta.env.VITE_API_URL_IMAGE}/${item.img}` })),
            React.createElement(Text, { size: 'l' }, item.name)),
        React.createElement("div", { className: styles.Item__case },
            React.createElement(Button, { size: 'xs', view: 'primary', onClick: openEdit, iconLeft: IconEdit }),
            React.createElement(Button, { size: 'xs', view: 'primary', iconLeft: IconTrash, onClick: openRemove })),
        React.createElement(Modal, { isOpen: open, onClickOutside: () => setOpen(false) },
            React.createElement("img", { onClick: () => setOpen(false), style: { maxWidth: '60vw', borderRadius: '10px' }, src: `${import.meta.env.VITE_API_URL_IMAGE}/${item.img}` }))));
};
export default AdministrationTypesItem;
//# sourceMappingURL=AdministrationTypesItem.js.map