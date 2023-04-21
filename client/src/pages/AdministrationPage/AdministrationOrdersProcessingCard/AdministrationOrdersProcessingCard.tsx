import React, { useMemo } from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import styles from './AdministrationOrdersProcessingCard.styl';
import { Draggable } from 'react-beautiful-dnd';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import ordersApi from 'src/api/requests/ordersApi';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import { Button } from '@consta/uikit/Button';

interface IComponentProps {
  item: OrderProcessingModel;
  index: number;
  setOrders: React.Dispatch<React.SetStateAction<OrderProcessingModel[]>>;
}

const AdministrationOrdersProcessingCard: React.FC<IComponentProps> = ({
  item,
  index,
  setOrders,
}) => {
  const newStatus = () => {
    switch (item.status) {
      case OrderProcessingStatusEnum.CREATED:
        return OrderProcessingStatusEnum.CONSIDERATION;
      case OrderProcessingStatusEnum.CONSIDERATION:
        return OrderProcessingStatusEnum.IN_WORK;
      case OrderProcessingStatusEnum.IN_WORK:
        return OrderProcessingStatusEnum.READY;
      case OrderProcessingStatusEnum.READY:
        return OrderProcessingStatusEnum.DELIVERY;
      case OrderProcessingStatusEnum.DELIVERY:
        return OrderProcessingStatusEnum.COMPLETED;
      case OrderProcessingStatusEnum.REJECTED:
        return OrderProcessingStatusEnum.REJECTED;
      default:
        return OrderProcessingStatusEnum.CREATED;
    }
  };
  const updateOrderStatus = async (status: OrderProcessingStatusEnum) => {
    if (item) {
      await ordersApi
        .updateOrderProcessing(item.id.toString(), {
          type: item.type,
          status: status,
        })
        .then(() => {
          setOrders((prevState) => {
            return [
              ...prevState.map((order) => {
                if (
                  order.id === item.id &&
                  order.name.toLowerCase() === item.name.toLowerCase()
                ) {
                  return { ...order, status: status };
                } else return { ...order };
              }),
            ];
          });
        });
    }
  };
  const allPrice = useMemo(() => {
    return (
      item.items.reduce((accum, elem) => accum + elem.price * elem.count, 0) +
      item.items
        .map((item) =>
          item.decors
            .map((decor) =>
              decor.items.reduce(
                (accum, elem) => accum + elem.count * elem.pricePerUnit,
                0,
              ),
            )
            .reduce((acc, el) => acc + el, 0),
        )
        .reduce((acc, elem) => acc + elem, 0)
    );
  }, [item]);
  return (
    <Draggable draggableId={`${item.dropId}`} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.ProcessingCard}
        >
          <div className={styles.ProcessingCard__header}>
            <Text>
              {item.name}

              <Text size={'s'} view={'secondary'}>
                Дата выдачи: &nbsp;
                {new Date(item.date_completed).toLocaleDateString()}
              </Text>
            </Text>
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
                <div>
                  {itm.name} {itm.decors.length > 0 && `(С декором)`}
                </div>
                <div>{itm.price},00 ₽</div>
                <div>{itm.count} шт</div>
              </div>
            ))}
          </div>
          <div className={styles.ProcessingCard__footer}>
            <Text size={'s'} weight={'semibold'}>
              Итого: {allPrice}
              ,00 ₽
            </Text>
            <Text size={'xs'} view={'link'}>
              Посмотреть полную информацию
            </Text>
          </div>
          <footer className={styles.ProcessingCard__actions}>
            <Button
              label={'Отменить'}
              onClick={() => {
                updateOrderStatus(OrderProcessingStatusEnum.REJECTED);
              }}
            />
            <Button
              label={'Следующий шаг'}
              onClick={() => {
                updateOrderStatus(newStatus());
              }}
            />
          </footer>
        </Card>
      )}
    </Draggable>
  );
};

export default AdministrationOrdersProcessingCard;
