import React, { useRef } from 'react';
import { Checkbox } from '@consta/uikit/Checkbox';
import { Text } from '@consta/uikit/Text';
import { OrderBasketChangeDecors } from 'src/pages/CreateOrder/CreateOrderCakeItem/CreateOrderCakeItem';
import styles from './CreateOrderDecorItem.styl';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setBasket } from 'src/redux/features/basket/BasketSlice';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import { Button } from '@consta/uikit/Button';

interface IComponentProps {
  item: OrderBasketChangeDecors;
  setOrderDecors: React.Dispatch<
    React.SetStateAction<OrderBasketChangeDecors[]>
  >;
  index: number;
  parentId: number;
}

const CreateOrderDecorItem: React.FC<IComponentProps> = ({
  item,
  setOrderDecors,
  index,
  parentId,
}) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const ref = useRef(item.count);
  const addDecorInBasket = () => {
    dispatch(
      setBasket({
        ...basket,
        items: basket.items.map((itm) => {
          return {
            ...itm,
            decors: itm.decors.map((decor) => {
              return {
                ...decor,
                items: decor.items.map((d) => {
                  if (d.localId === item.localId && parentId === itm.id) {
                    setOrderDecors((prevState) => [
                      ...prevState.map((elem, idx) => {
                        if (
                          elem.localId === item.localId &&
                          parentId === itm.id &&
                          idx === index &&
                          elem.isChecked
                        ) {
                          return { ...elem, count: elem.count + 1 };
                        } else return { ...elem };
                      }),
                    ]);
                    return { ...d, count: d.count + 1 };
                  } else return { ...d };
                }),
              };
            }),
          };
        }),
      }),
    );
  };
  const removeDecorInBasket = () => {
    dispatch(
      setBasket({
        ...basket,
        items: basket.items.map((itm) => {
          return {
            ...itm,
            decors: itm.decors.map((decor) => {
              return {
                ...decor,
                items: decor.items.map((d) => {
                  if (
                    d.count > ref.current &&
                    d.localId === item.localId &&
                    parentId === itm.id
                  ) {
                    setOrderDecors((prevState) => [
                      ...prevState.map((elem, idx) => {
                        if (
                          elem.localId === item.localId &&
                          parentId === itm.id &&
                          idx === index &&
                          elem.isChecked &&
                          elem.count > ref.current
                        ) {
                          return { ...elem, count: elem.count - 1 };
                        } else return { ...elem };
                      }),
                    ]);
                    return { ...d, count: d.count - 1 };
                  } else return { ...d };
                }),
              };
            }),
          };
        }),
      }),
    );
  };
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
      <Text className={styles.Decor__actions}>
        <Button
          view={
            !item.isChecked || item.count <= ref.current ? 'ghost' : 'secondary'
          }
          disabled={!item.isChecked || item.count <= ref.current}
          size={'xs'}
          onClick={() => removeDecorInBasket()}
          label={'-'}
        />
        {item.count} {item.countType}
        <Button
          view={
            !item.isChecked || item.count < ref.current ? 'ghost' : 'secondary'
          }
          disabled={!item.isChecked || item.count < ref.current}
          size={'xs'}
          onClick={() => addDecorInBasket()}
          label={'+'}
        />
      </Text>
      <Text>{item.pricePerUnit},00 ₽</Text>
      <Text>{item.count * item.pricePerUnit},00 ₽</Text>
    </div>
  );
};

export default CreateOrderDecorItem;
