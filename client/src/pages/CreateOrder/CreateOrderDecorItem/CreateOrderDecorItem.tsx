import React from 'react';
import { Checkbox } from '@consta/uikit/Checkbox';
import { Text } from '@consta/uikit/Text';
import { OrderBasketChangeDecors } from 'src/pages/CreateOrder/CreateOrderCakeItem/CreateOrderCakeItem';

interface IComponentProps {
  item: OrderBasketChangeDecors;
  setOrderDecors: React.Dispatch<
    React.SetStateAction<OrderBasketChangeDecors[]>
  >;
  index: number;
}

const CreateOrderDecorItem: React.FC<IComponentProps> = ({
  item,
  setOrderDecors,
  index,
}) => {
  return (
    <div>
      <Checkbox
        checked={item.isChecked}
        onClick={() => {
          setOrderDecors((prevState) => {
            return prevState.map((d, i) => {
              if (i === index) {
                return { ...d, isChecked: !d.isChecked };
              } else return { ...d };
            });
          });
        }}
      />
      <Text>{item.name}</Text>
    </div>
  );
};

export default CreateOrderDecorItem;
