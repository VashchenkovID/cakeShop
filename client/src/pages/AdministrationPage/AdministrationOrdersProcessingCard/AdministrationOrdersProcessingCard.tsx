import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import styles from './AdministrationOrdersProcessingCard.styl';
import { Draggable } from 'react-beautiful-dnd';
import OrderProcessingStatusBadge from 'src/components/OrderProcessingStatusBadge/OrderProcessingStatusBadge';
import {Card} from "@consta/uikit/Card";
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
          <div>{item.name}</div>
          <div>
            <OrderProcessingStatusBadge status={item.status} />
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default AdministrationOrdersProcessingCard;
