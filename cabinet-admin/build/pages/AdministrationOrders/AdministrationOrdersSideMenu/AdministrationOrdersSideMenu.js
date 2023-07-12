import React from 'react';
import AdministrationOrdersSideMenuItem from 'src/pages/AdministrationOrders/AdministrationOrdersSideMenuItem/AdministrationOrdersSideMenuItem';
import styles from './AdministrationOrdersSideMenu.module.styl';
const AdministrationOrdersSideMenu = ({ orders, activeElement, setActiveElement, }) => {
    return (React.createElement("div", { className: styles.SideMenu }, orders.map((order, index) => (React.createElement(AdministrationOrdersSideMenuItem, { activeElement: activeElement, setActiveElement: setActiveElement, key: index, order: order })))));
};
export default AdministrationOrdersSideMenu;
//# sourceMappingURL=AdministrationOrdersSideMenu.js.map