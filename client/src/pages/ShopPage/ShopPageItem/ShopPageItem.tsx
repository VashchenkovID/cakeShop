import React, { useEffect, useMemo, useState } from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './ShopPageItem.styl';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { setBasket } from 'src/redux/features/basket/BasketSlice';
import { IconFavorite } from '@consta/uikit/IconFavorite';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
interface IComponentProps {
  item: DeviceListModel;
  activeItem: number | null;
}

const ShopPageItem: React.FC<IComponentProps> = ({ item, activeItem }) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const userName = localStorage.getItem(LocalStorageKeysEnum.NAME);
  const userId = localStorage.getItem(LocalStorageKeysEnum.ID);
  const [isAdded, setIsAdded] = useState(false);

  const addItemInBasket = async () => {
    if (userId) {
      if (!basket) {
        dispatch(
          setBasket({
            id: null,
            name: `Заказ пользователя ${userName}`,
            user_id: Number(userId),
            items: [
              {
                id: item.id,
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
              },
            ],
          }),
        );
        setIsAdded(true);
      }
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.id === item.id) {
                  return { ...i, count: i.count + 1 };
                } else return { ...i };
              }),
            }),
          );
        } else {
          dispatch(
            setBasket({
              ...basket,
              items: [
                ...basket.items,
                {
                  id: item.id,
                  name: item.name,
                  deviceId: item.id,
                  count: 1,
                  price: item.price,
                  basketId: null,
                },
              ],
            }),
          );
        }
      }
    } else {
      if (!basket) {
        dispatch(
          setBasket({
            id: null,
            name: `Индивидуальный заказ`,
            user_id: null,
            items: [
              {
                id: item.id,
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
              },
            ],
          }),
        );
        setIsAdded(true);
      }
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.id === item.id) {
                  return { ...i, count: i.count + 1 };
                } else return { ...i };
              }),
            }),
          );
        } else {
          dispatch(
            setBasket({
              ...basket,
              items: [
                ...basket.items,
                {
                  id: item.id,
                  name: item.name,
                  deviceId: item.id,
                  count: 1,
                  price: item.price,
                  basketId: null,
                },
              ],
            }),
          );
        }
      }
    }
  };
  const removeItemInBasket = async () => {
    if (userId) {
      if (!basket) {
        dispatch(
          setBasket({
            id: null,
            name: `Заказ пользователя ${userName}`,
            user_id: Number(userId),
            items: [
              {
                id: item.id,
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
              },
            ],
          }),
        );
        setIsAdded(true);
      }
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.id === item.id) {
                  if (i.count <= 1) {
                    return { ...i, count: 1 };
                  }
                  return { ...i, count: i.count - 1 };
                } else return { ...i };
              }),
            }),
          );
        } else {
          dispatch(
            setBasket({
              ...basket,
              items: [
                ...basket.items,
                {
                  id: item.id,
                  name: item.name,
                  deviceId: item.id,
                  count: 1,
                  price: item.price,
                  basketId: null,
                },
              ],
            }),
          );
        }
      }
    } else {
      if (!basket) {
        dispatch(
          setBasket({
            id: null,
            name: `Индивидуальный заказ`,
            user_id: null,
            items: [
              {
                id: item.id,
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
              },
            ],
          }),
        );
        setIsAdded(true);
      }
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.id === item.id) {
                  if (i.count <= 1) {
                    return { ...i, count: 1 };
                  }
                  return { ...i, count: i.count - 1 };
                } else return { ...i };
              }),
            }),
          );
        } else {
          dispatch(
            setBasket({
              ...basket,
              items: [
                ...basket.items,
                {
                  id: item.id,
                  name: item.name,
                  deviceId: item.id,
                  count: 1,
                  price: item.price,
                  basketId: null,
                },
              ],
            }),
          );
        }
      }
    }
  };

  const countItemBasket = useMemo(() => {
    if (basket) {
      if (basket.items.length > 0) {
        const findItem: {
          id: number;
          name: string;
          deviceId: number;
          basketId: number;
          count: number;
          price: number;
        } = basket.items.find((itm) => itm.id === item.id);
        if (findItem) {
          return findItem.count;
        } else return 0;
      } else return 0;
    } else return 0;
  }, [basket]);

  useEffect(() => {
    if (basket && basket.items.find((elem) => elem.id === item.id)) {
      setIsAdded(true);
    }
  }, [basket]);

  return (
    <div className={styles.Item}>
      <img
        className={styles.Item__image}
        src={`http://localhost:8081/${item.img}`}
      />
      <Text weight={'semibold'} className={styles.Item__title}>
        {item.name}
      </Text>
      <Text size={'s'} view={'secondary'} className={styles.Item__subtitle}>
        {item.description}
      </Text>
      <div className={styles.Item__footer}>
        {item.rating > 0 && (
          <div className={styles.Item__rating}>
            <Text className={styles.Item__rating__text}>{item.rating}</Text>
            <IconFavorite className={styles.Item__rating__icon} />
          </div>
        )}

        <Text weight={'bold'} size={'l'}>
          {item.price},00 ₽
        </Text>
      </div>
      <div className={styles.Item__button}>
        {!isAdded ? (
          <Button onClick={() => addItemInBasket()} label={'Добавить'} />
        ) : (
          <div>
            <Button label={'-'} onClick={() => removeItemInBasket()} />
            {countItemBasket}
            <Button onClick={() => addItemInBasket()} label={'+'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPageItem;
