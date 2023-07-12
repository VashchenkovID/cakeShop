import React from 'react';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import styles from './OrderProcessingStatusBadge.module.styl';
import cn from 'classnames/bind';

interface IComponentProps {
  status: OrderProcessingStatusEnum;
}

enum OrderProcessingStatusEnumRus {
  CREATED = 'Новый',
  CONSIDERATION = 'На рассмотрении',
  IN_WORK = 'В работе',
  READY = 'Готов',
  DELIVERY = 'Доставка',
  COMPLETED = 'Завершен',
  REJECTED = 'Отклонен',
  idle = 'Неизвестно',
}

const cx = cn.bind(styles);

const OrderProcessingStatusBadge: React.FC<IComponentProps> = ({ status }) => {
  return (
    <div
      className={cx(styles.container, {
        created: status === OrderProcessingStatusEnum.CREATED,
        consideration: status === OrderProcessingStatusEnum.CONSIDERATION,
        inWork: status === OrderProcessingStatusEnum.IN_WORK,
        ready: status === OrderProcessingStatusEnum.READY,
        completed: status === OrderProcessingStatusEnum.COMPLETED,
        rejected: status === OrderProcessingStatusEnum.REJECTED,
        delivery: status === OrderProcessingStatusEnum.DELIVERY,
      })}
    >
      {OrderProcessingStatusEnumRus[status]}
    </div>
  );
};

export default OrderProcessingStatusBadge;
