import React, { useEffect, useRef, useState } from 'react';
import styles from './CreateOrderCakeItem.styl';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconTrash } from '@consta/uikit/IconTrash';
import { setBasket } from 'src/redux/features/basket/BasketSlice';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import { Collapse } from '@consta/uikit/Collapse';
import { DecorUserModel } from 'src/api/models/DecorUserModel';
import CreateOrderDecorItem from 'src/pages/CreateOrder/CreateOrderDecorItem/CreateOrderDecorItem';
import useCreateOrderCakeItem from 'src/pages/CreateOrder/CreateOrderCakeItem/useCreateOrderCakeItem';
import { nanoid } from 'nanoid';

export interface OrderBasketChangeDecors extends DecorUserModel {
  isChecked: boolean;
  localId: string;
}

interface IComponentProps {
  item: {
    id: number;
    localId: string;
    name: string;
    deviceId: number;
    basketId: number;
    count: number;
    price: number;
    countWeightType: number;
    weightType: string;
    decors: {
      id: number;
      name: string;
      items: {
        id: number;
        name: string;
        count: number;
        countType: string;
        pricePerUnit: number;
      }[];
    }[];
  };
  decors: DecorUserModel[];
  orderDecors: OrderBasketChangeDecors[];
  setOrderDecors: React.Dispatch<
    React.SetStateAction<OrderBasketChangeDecors[]>
  >;
}

const CreateOrderCakeItem: React.FC<IComponentProps> = ({
  item,
  orderDecors,
  setOrderDecors,
}) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const ref = useRef(item.countWeightType);
  const [isOpen, setIsOpen] = useState(false);
  const [localOrderDecors, setLocalOrderDecors] = useState<
    OrderBasketChangeDecors[]
  >([]);
  const { removeWeightCountInBasket, addWeightCountInBasket } =
    useCreateOrderCakeItem(item, ref);

  const addNewDecor = () => {
    dispatch(
      setBasket({
        ...basket,
        items: basket.items.map((i) => {
          if (i.name === item.name) {
            return {
              ...i,
              decors: [
                ...i.decors,
                {
                  id: null,
                  name: `Декор для ${i.name}`,
                  items: [] as any,
                  localId: nanoid(),
                },
              ],
            };
          } else return { ...i };
        }),
      }),
    );
  };

  useEffect(() => {
    if (orderDecors) {
      setLocalOrderDecors(orderDecors);
    }
  }, [orderDecors]);

  useEffect(() => {
    if (localOrderDecors) {
      dispatch(
        setBasket({
          ...basket,
          items: basket.items.map((oldItem) => {
            return {
              ...oldItem,
              decors: oldItem.decors.map((decor) => {
                if (decor.name === `Декор для ${item.name}`) {
                  return {
                    ...decor,
                    items: localOrderDecors.filter((od) => od.isChecked),
                  };
                } else return { ...decor };
              }),
            };
          }),
        }),
      );
    }
  }, [localOrderDecors]);
  return (
    <Collapse
      isOpen={isOpen}
      className={styles.Collapse}
      label={
        <div className={styles.CakeItem}>
          <div>
            <Text size={'xl'}> {item.name}</Text>
            <Button
              label={isOpen ? 'Скрыть декор' : 'Показать декор'}
              onClick={() => setIsOpen((prev) => !prev)}
              size={'xs'}
            />
          </div>
          <Text className={styles.CakeItem__basketActions}>
            <Text size={'xl'}>{item.count} шт</Text>
          </Text>
          <Text className={styles.CakeItem__basketActions} size={'xl'}>
            <Button
              size={'s'}
              label={'-'}
              view={item.countWeightType === ref.current ? 'ghost' : 'primary'}
              disabled={item.countWeightType === ref.current}
              onClick={() => removeWeightCountInBasket(item)}
            />
            <Text size={'xl'}>
              {item.countWeightType} {item.weightType}
            </Text>
            <Button
              size={'s'}
              onClick={() => addWeightCountInBasket(item)}
              label={'+'}
            />
          </Text>
          <Text size={'xl'}>{item.price},00 ₽</Text>
          <Text className={styles.CakeItem__actions} size={'2xl'}>
            {Number(item.count) *
              Number(item.price) *
              Number(item.countWeightType)}
            ,00 ₽
            <Button
              size={'s'}
              iconLeft={IconTrash}
              onClick={() => {
                dispatch(
                  setBasket({
                    ...basket,
                    items: basket.items.filter(
                      (elem) => elem.localId !== item.localId,
                    ),
                  }),
                );
              }}
            />
          </Text>
        </div>
      }
    >
      <div className={styles.Decor__rows}>
        <div className={styles.Decor__addDec}>
          {item.decors.length === 0 && (
            <Button
              label={'Добавить декор к десерту'}
              size={'xs'}
              onClick={addNewDecor}
            />
          )}
        </div>

        {item.decors.length > 0 && (
          <div className={styles.Decor}>
            <Text size={'s'}>Наименование</Text>
            <Text size={'s'}>Количество</Text>
            <Text size={'s'}>Цена за 1шт</Text>
            <Text size={'s'}>Итог</Text>
          </div>
        )}

        {item.decors.length > 0 &&
          localOrderDecors.map((decor, index) => (
            <CreateOrderDecorItem
              item={decor}
              key={index}
              index={index}
              setOrderDecors={setLocalOrderDecors}
              parentId={item.id}
            />
          ))}
      </div>
    </Collapse>
  );
};

export default CreateOrderCakeItem;
