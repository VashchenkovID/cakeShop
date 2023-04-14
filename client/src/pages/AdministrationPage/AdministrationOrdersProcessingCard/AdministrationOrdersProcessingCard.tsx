import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import styles from './AdministrationOrdersProcessingCard.styl';
import { Draggable } from 'react-beautiful-dnd';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
interface IComponentProps {
  item: OrderProcessingModel;
  index: number;
}

const AdministrationOrdersProcessingCard: React.FC<IComponentProps> = ({
  item,
  index,
}) => {
  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.ProcessingCard}
        >
          <div className={styles.ProcessingCard__header}>
            <Text>{item.name}</Text>
            <div>
              <OrderProcessingStatusBadge status={item.status} />
            </div>
          </div>
          <div className={styles.ProcessingCard__content}>
            <div className={styles.ProcessingCard__content__row}>
              <div>Десерт</div>
              <div>Цена за ед.</div>
              <div>Кол-во</div>
            </div>
            {item.items.map((itm, idx) => (
              <div className={styles.ProcessingCard__content__row} key={idx}>
                <div>{itm.name}</div>
                <div>{itm.price},00 ₽</div>
                <div>{itm.count} шт</div>
              </div>
            ))}
          </div>
          <div className={styles.ProcessingCard__footer}>
            <Text size={'s'} weight={'semibold'}>
              Итого: {item.items.reduce((accum, elem) => accum + elem.price, 0)}
              ,00 ₽
            </Text>
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default AdministrationOrdersProcessingCard;
