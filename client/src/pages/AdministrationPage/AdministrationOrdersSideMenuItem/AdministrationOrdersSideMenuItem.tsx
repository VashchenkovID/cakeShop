import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationOrdersSideMenuItem.styl';
import cn from 'classnames/bind';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';

interface IComponentProps {
  order: OrderProcessingModel;
  activeElement: number;
  setActiveElement: React.Dispatch<React.SetStateAction<number>>;
}

const cx = cn.bind(styles);

const AdministrationOrdersSideMenuItem: React.FC<IComponentProps> = ({
  order,
  activeElement,
  setActiveElement,
}) => {
  return (
    <div
      onClick={() => {
        setActiveElement(order.dropId);
      }}
      className={styles.Item}
    >
      <div>
        <Text
          className={cx(styles.Item__text, {
            active: activeElement === order.dropId,
          })}
          weight={'semibold'}
        >
          {order.name}
        </Text>
        <Text view={'secondary'}>
          Дата выдачи: {new Date(order.date_completed).toLocaleDateString()}
        </Text>
      </div>
      <OrderProcessingStatusBadge
        status={order.status as OrderProcessingStatusEnum}
      />
    </div>
  );
};

export default AdministrationOrdersSideMenuItem;
