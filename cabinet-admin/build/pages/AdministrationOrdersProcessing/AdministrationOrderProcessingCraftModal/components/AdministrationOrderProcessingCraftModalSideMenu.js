import React from 'react';
import cn from 'classnames/bind';
import styles from 'src/pages/AdministrationOrdersProcessing/AdministrationOrderProcessingCraftModal/AdministrationOrderProcessingCraftModal.module.styl';
import { Text } from '@consta/uikit/Text';
const cx = cn.bind(styles);
const AdministrationOrderProcessingCraftModalSideMenu = ({ items, activeItem, setActiveItem }) => {
    return (React.createElement("div", { className: styles.ModalContainer__content__leftSide }, items.map((item, index) => (React.createElement("div", { onClick: () => setActiveItem(item), className: cx(styles.ModalContainer__content__leftSide__row, {
            active: activeItem && activeItem.id === item.id,
        }), key: index },
        React.createElement(Text, { className: cx(styles.ModalContainer__content__leftSide__row__title, {
                active: activeItem && activeItem.id === item.id,
            }), size: 'l' }, item.name))))));
};
export default AdministrationOrderProcessingCraftModalSideMenu;
//# sourceMappingURL=AdministrationOrderProcessingCraftModalSideMenu.js.map