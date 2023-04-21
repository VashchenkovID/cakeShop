import React from 'react';
import { Checkbox } from '@consta/uikit/Checkbox';
import { Text } from '@consta/uikit/Text';
import { OrderBasketChangeDecors } from 'src/pages/CreateOrder/CreateOrderCakeItem/CreateOrderCakeItem';
import styles from './CreateOrderDecorItem.styl';

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
    <div className={styles.Decor}>
      <div className={styles.Decor__name}>
        <Checkbox
            className={styles.Checkbox}
          view={'primary'}
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
      <Text>{item.count} {item.countType}</Text>
      <Text>{item.pricePerUnit},00 ₽</Text>
      <Text>{item.count * item.pricePerUnit},00 ₽</Text>
    </div>
  );
};

export default CreateOrderDecorItem;
