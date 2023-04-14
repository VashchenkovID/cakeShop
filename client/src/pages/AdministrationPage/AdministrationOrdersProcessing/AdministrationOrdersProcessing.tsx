import React, { useEffect, useMemo, useState } from 'react';
import ordersApi from 'src/api/requests/ordersApi';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import styles from './AdministrationOrdersProcessing.styl';
import AdministrationOrdersProcessingCard from 'src/pages/AdministrationPage/AdministrationOrdersProcessingCard/AdministrationOrdersProcessingCard';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { DatePicker } from '@consta/uikit/DatePicker';
import useRequest from 'src/hooks/useRequest';
import { Loader } from '@consta/uikit/Loader';

const ColumnIndexes = [
  { index: 0, value: OrderProcessingStatusEnum.CREATED },
  { index: 1, value: OrderProcessingStatusEnum.CONSIDERATION },
  { index: 2, value: OrderProcessingStatusEnum.IN_WORK },
  { index: 3, value: OrderProcessingStatusEnum.READY },
  { index: 4, value: OrderProcessingStatusEnum.DELIVERY },
];

const AdministrationOrdersProcessing: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const [orders, setOrders] = useState<OrderProcessingModel[]>([]);
  const [startType, setStartType] = useState(OrderProcessingStatusEnum.IDLE);
  const [startIndex, setStartIndex] = useState(0);
  const { load: getOrders, isLoading } = useRequest(
    ordersApi.getOrderProcessing,
    (r) => {
      if (r) {
        setOrders(
          r.data.items.map((order, index) => {
            return { ...order, order: index };
          }),
        );
      }
    },
  );

  const boardItems = useMemo(() => {
    return [
      {
        title: 'Новый',
        color: '#00BBF0',
        type: OrderProcessingStatusEnum.CREATED,
        items: orders.filter(
          (order) => order.status === OrderProcessingStatusEnum.CREATED,
        ),
      },
      {
        title: 'На рассмотрении',
        color: '#00BBF0',
        type: OrderProcessingStatusEnum.CONSIDERATION,
        items: orders.filter(
          (order) => order.status === OrderProcessingStatusEnum.CONSIDERATION,
        ),
      },
      {
        title: 'В работе',
        color: '#FFAA64',
        type: OrderProcessingStatusEnum.IN_WORK,
        items: orders.filter(
          (order) => order.status === OrderProcessingStatusEnum.IN_WORK,
        ),
      },
      {
        title: 'Готов',
        color: '#17B978',
        type: OrderProcessingStatusEnum.READY,
        items: orders.filter(
          (order) => order.status === OrderProcessingStatusEnum.READY,
        ),
      },
      {
        title: 'Доставка',
        color: '#6c6cd5',
        type: OrderProcessingStatusEnum.DELIVERY,
        items: orders.filter(
          (order) => order.status === OrderProcessingStatusEnum.DELIVERY,
        ),
      },
    ];
  }, [orders]);
  const [, setMyBoardItems] = useState<
    {
      title: string;
      color: string;
      type: OrderProcessingStatusEnum;
      items: OrderProcessingModel[];
    }[]
  >([]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, draggableId, source } = result;
    if (!destination) return;
    const findColumn = ColumnIndexes.find(
      (col) => col.value === destination.droppableId,
    );
    if (findColumn) {
      if (
        source.index === startIndex &&
        destination.droppableId === startType
      ) {
        const myColumn = boardItems.find(
          (item) => item.type === destination.droppableId,
        );
        if (myColumn !== undefined) {
          const myItem = myColumn.items.splice(startIndex, 1);
          myColumn.items.splice(destination.index, 0, ...myItem);
          setMyBoardItems([
            ...boardItems.map((item, index) => {
              if (index === findColumn.index) {
                return { ...myColumn };
              } else return { ...item };
            }),
          ]);
        }
      }
    }
    if (destination.droppableId !== startType) {
      setOrders([
        ...orders
          .map((item) => {
            if (item.id === Number(draggableId)) {
              return {
                ...item,
                status: destination.droppableId as OrderProcessingStatusEnum,
                order: destination.index,
              };
            } else return { ...item };
          })
          .sort((a, b) => a.order - b.order),
      ]);
      const reqItem = orders.find((item) => item.id === Number(draggableId));
      if (reqItem) {
        await ordersApi.updateOrderProcessing(reqItem.id.toString(), {
          type: reqItem.type,
          status: destination.droppableId as OrderProcessingStatusEnum,
        });
      }
    }
  };

  useEffect(() => {
    getOrders(date.toISOString());
  }, [date]);
  return (
    <section className={styles.Processing}>
      <DatePicker
        label={'Выберите месяц'}
        labelPosition={'left'}
        className={styles.Processing__datePicker}
        size={'s'}
        form={'round'}
        type="month"
        value={date}
        onChange={({ value }) => setDate(value)}
      />
      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <div className={styles.Processing__content}>
        {!isLoading && (
          <DragDropContext
            onDragStart={(start) => {
              setStartType(
                start.source.droppableId as OrderProcessingStatusEnum,
              );
              setStartIndex(start.source.index);
              console.log(start);
            }}
            onDragEnd={onDragEnd}
          >
            {boardItems.map((board, index) => (
              <Droppable
                droppableId={board.type}
                key={`${index}_${board.type}`}
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.Processing__content__column}
                  >
                    <div
                      className={styles.Processing__content__column__header}
                      style={{ borderLeft: `6px solid ${board.color}` }}
                    >
                      <h1>{board.title}</h1>
                    </div>

                    <div className={styles.Processing__content__cards}>
                      {board.items.map((item, idx) => (
                        <AdministrationOrdersProcessingCard
                          item={item}
                          key={`${item.id}_${idx}`}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        )}
      </div>
    </section>
  );
};

export default React.memo(AdministrationOrdersProcessing);
