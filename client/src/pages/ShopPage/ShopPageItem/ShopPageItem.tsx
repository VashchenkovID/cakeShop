import React, { useEffect, useState } from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './ShopPageItem.styl';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { setBasket } from 'src/redux/features/basket/BasketSlice';
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
    }
  };
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
      <p className={styles.Item__title}>{item.name}</p>
      <p className={styles.Item__subtitle}>{item.description}</p>
      <div className={styles.Item__footer}>
        <p>
          {item.rating} <StarFilled />
        </p>
        <p>{item.price},00 ₽</p>
      </div>
      <div className={styles.Item__button}>
        {!isAdded ? (
          <Button onClick={() => addItemInBasket()}>Добавить</Button>
        ) : (
          <Button onClick={() => addItemInBasket()}>+</Button>
        )}
      </div>
    </div>
  );
};

export default ShopPageItem;
