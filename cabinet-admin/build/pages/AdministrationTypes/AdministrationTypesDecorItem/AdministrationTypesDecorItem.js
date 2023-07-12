import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesDecorItem.module.styl';
import { AdministrationTypesItemsEnum, AdministrationTypesModalEnum, } from 'src/pages/AdministrationTypes/AdministrationTypes';
import { Button } from '@consta/uikit/Button';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
const AdministrationTypesDecorItem = ({ item, setEdit, setModal, type, }) => {
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
    return (React.createElement("div", { className: styles.DecorItem },
        React.createElement(Text, null, item.name),
        React.createElement(Text, null, item.count),
        React.createElement(Text, null, item.countType),
        React.createElement(Text, null,
            Number(item.pricePerUnit),
            " \u20BD"),
        React.createElement(Text, null,
            " ",
            item.constPrice,
            " \u20BD"),
        React.createElement("div", { className: styles.DecorItem__actions },
            React.createElement(Button, { size: 'xs', view: 'primary', onClick: openEdit, iconLeft: IconEdit }),
            React.createElement(Button, { size: 'xs', view: 'primary', iconLeft: IconTrash, onClick: openRemove }))));
};
export default AdministrationTypesDecorItem;
//# sourceMappingURL=AdministrationTypesDecorItem.js.map