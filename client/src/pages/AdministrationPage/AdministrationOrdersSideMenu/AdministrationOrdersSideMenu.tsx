import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import AdministrationOrdersSideMenuItem from 'src/pages/AdministrationPage/AdministrationOrdersSideMenuItem/AdministrationOrdersSideMenuItem';
import styles from './AdministrationOrdersSideMenu.styl';

interface IComponentProps {
  orders: OrderProcessingModel[];
  activeElement: number;
  setActiveElement: React.Dispatch<React.SetStateAction<number>>;
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
