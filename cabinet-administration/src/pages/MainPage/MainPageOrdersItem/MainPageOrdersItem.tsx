import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import { convertDateWithTime } from 'src/utils/functions';
import styles from './MainPageOrdersItem.styl';
import { Text } from '@consta/uikit/Text';

interface IComponentProps {
  order: OrderProcessingModel;
}

const MainPageOrdersItem: React.FC<IComponentProps> = ({ order }) => {
  return (
    <div className={styles.Item}>
      <Text size={'s'}>{order.name}</Text>
      <Text size={'s'}>{convertDateWithTime(order.createdAt)}</Text>
      <OrderProcessingStatusBadge status={order.status} />
    </div>
  );
};

export default MainPageOrdersItem;
