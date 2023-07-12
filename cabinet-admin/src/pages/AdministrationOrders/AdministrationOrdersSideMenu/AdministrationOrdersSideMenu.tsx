import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import AdministrationOrdersSideMenuItem from 'src/pages/AdministrationOrders/AdministrationOrdersSideMenuItem/AdministrationOrdersSideMenuItem';
import styles from './AdministrationOrdersSideMenu.module.styl';

interface IComponentProps {
  orders: OrderProcessingModel[];
  activeElement: number | null;
  setActiveElement: React.Dispatch<React.SetStateAction<number | null>>;
}

const AdministrationOrdersSideMenu: React.FC<IComponentProps> = ({
  orders,
  activeElement,
  setActiveElement,
}) => {
  return (
    <div className={styles.SideMenu}>
      {orders.map((order, index) => (
        <AdministrationOrdersSideMenuItem
          activeElement={activeElement}
          setActiveElement={setActiveElement}
          key={index}
          order={order}
        />
      ))}
    </div>
  );
};

export default AdministrationOrdersSideMenu;
