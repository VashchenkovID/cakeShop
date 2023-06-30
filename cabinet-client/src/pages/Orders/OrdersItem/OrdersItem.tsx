import React from "react";
import { OrderModel } from "src/api/models/OrderModel";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";

interface IComponentProps {
  item: OrderModel;
}

const OrdersItem: React.FC<IComponentProps> = ({ item }) => {
  return (
    <ComponentStyleWrapper>
      <div>
        <Text>{`${item.name} от ${new Date(
          item.createdAt
        ).toLocaleDateString()}`}</Text>
        <Text size={'s'} view={'secondary'}>Дата выдачи: {new Date(item.date_completed).toLocaleDateString()}</Text>
      </div>
    </ComponentStyleWrapper>
  );
};

export default OrdersItem;
