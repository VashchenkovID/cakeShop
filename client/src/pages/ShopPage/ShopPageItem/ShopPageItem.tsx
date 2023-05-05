import React, { useEffect, useMemo, useState } from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './ShopPageItem.styl';
import cn from 'classnames/bind';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { setBasket } from 'src/redux/features/basket/BasketSlice';
import { IconFavorite } from '@consta/uikit/IconFavorite';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { Modal } from '@consta/uikit/Modal';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
interface IComponentProps {
  item: DeviceListModel;
  activeItem?: number | null;
}
const cx = cn.bind(styles);

const ShopPageItem: React.FC<IComponentProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const basket = useAppSelector(selectBasket);
  const userName = localStorage.getItem(LocalStorageKeysEnum.NAME);
  const userId = localStorage.getItem(LocalStorageKeysEnum.ID);
  const [isAdded, setIsAdded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
                localId: nanoid(),
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
                countWeightType: item.countWeightType,
                weightType: item.weightType,
                decors: [] as any,
              },
            ],
          }),
        );
        setIsAdded(true);
      }
      if (basket) {
        dispatch(
          setBasket({
            ...basket,
            items: [
              ...basket.items,
              {
                id: item.id,
                name: item.name,
                localId: nanoid(),
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
                countWeightType: item.countWeightType,
                weightType: item.weightType,
                decors: [],
              },
            ],
          }),
        );
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
                localId: nanoid(),
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
                countWeightType: item.countWeightType,
                weightType: item.weightType,
                decors: [],
              },
            ],
          }),
        );
        setIsAdded(true);
      }
      if (basket) {
        dispatch(
          setBasket({
            ...basket,
            items: [
              ...basket.items,
              {
                id: item.id,
                localId: nanoid(),
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
                countWeightType: item.countWeightType,
                weightType: item.weightType,
                decors: [],
              },
            ],
          }),
        );
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
                localId: nanoid(),
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
                countWeightType: item.countWeightType,
                weightType: item.weightType,
                decors: [],
              },
            ],
          }),
        );
        setIsAdded(true);
      }
      if (basket) {
        dispatch(
          setBasket({
            ...basket,
            items: [
              ...basket.items.filter((i) => i.id !== item.id),
              ...basket.items
                .filter((i) => i.id === item.id)
                .filter((el, ind, arr) => ind !== arr.length - 1),
            ],
          }),
        );
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
                localId: nanoid(),
                name: item.name,
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
                countWeightType: item.countWeightType,
                weightType: item.weightType,
                decors: [],
              },
            ],
          }),
        );
        setIsAdded(true);
      }
      if (basket) {
        dispatch(
          setBasket({
            ...basket,
            items: [
              ...basket.items,
              {
                id: item.id,
                name: item.name,
                localId: nanoid(),
                deviceId: item.id,
                count: 1,
                price: item.price,
                basketId: null,
                countWeightType: item.countWeightType,
                weightType: item.weightType,
                decors: [],
              },
            ],
          }),
        );
      }
    }
  };

  const countItemBasket = useMemo(() => {
    if (basket) {
      if (basket.items.length > 0) {
        return basket.items.filter((i) => i.id === item.id).length;
      } else return 0;
    } else return 0;
  }, [basket]);

  useEffect(() => {
    if (basket && basket.items.find((elem) => elem.id === item.id)) {
      setIsAdded(true);
    }
  }, [basket]);

  useEffect(() => {
    if (countItemBasket === 0) {
      setIsAdded(false);
    }
  }, [countItemBasket]);

  return (
    <div className={styles.Item}>
      <div className={styles.Item__header} onClick={() => setIsOpen(true)}>
        <img
          className={styles.Item__image}
          src={`${process.env.REACT_APP_IMAGE}${item.img}`}
        />
        <Text weight={'semibold'} className={styles.Item__title}>
          {item.name}
        </Text>
      </div>

      <div className={styles.Item__footer}>
        {item.rating > 0 && (
          <div className={styles.Item__rating}>
            <Text className={styles.Item__rating__text}>
              {item.rating.toFixed(2)}
            </Text>
            <IconFavorite className={styles.Item__rating__icon} />
          </div>
        )}
      </div>
      <div className={styles.Item__button}>
        <Text weight={'bold'} size={'l'}>
          Цена: {item.price * item.countWeightType},00 ₽
        </Text>
        {!isAdded ? (
          <Button
            size={'s'}
            onClick={() => addItemInBasket()}
            label={'Добавить'}
          />
        ) : (
          <div className={styles.Item__addActions}>
            <Button
              size={'s'}
              label={'-'}
              onClick={() => removeItemInBasket()}
            />
            <Text>{countItemBasket}</Text>
            <Button size={'s'} onClick={() => addItemInBasket()} label={'+'} />
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onClickOutside={() => setIsOpen(false)}
        onEsc={() => setIsOpen(false)}
      >
        <div
          className={cx(styles.Item, {
            modal: isOpen,
          })}
        >
          <div className={styles.Item__header}>
            <img
              className={styles.Item__image}
              src={`${process.env.REACT_APP_IMAGE}${item.img}`}
              onClick={() => setIsOpen(false)}
            />
            <div className={styles.Item__titleContainer}>
              <Text weight={'semibold'} className={styles.Item__title}>
                {item.name}
              </Text>
              <Button
                onClick={() =>
                  navigate(`${PublicRoutesEnum.CREATE_RATING}/${item.id}`)
                }
                label={'Оставить отзыв'}
                size={'xs'}
              />
            </div>
          </div>
          <Text view={'secondary'}>{item.description}</Text>
          <div className={styles.Item__footer}>
            {item.rating > 0 && (
              <div className={styles.Item__rating}>
                <Text className={styles.Item__rating__text}>
                  {Math.abs(item.rating)}
                </Text>
                <IconFavorite className={styles.Item__rating__icon} />
              </div>
            )}
          </div>
          <div className={styles.Item__button}>
            <Text weight={'bold'} size={'l'}>
              Цена: {item.price},00 ₽
            </Text>
            {!isAdded ? (
              <Button
                size={'s'}
                onClick={() => addItemInBasket()}
                label={'Добавить'}
              />
            ) : (
              <div className={styles.Item__addActions}>
                <Button
                  size={'s'}
                  label={'-'}
                  onClick={() => removeItemInBasket()}
                />
                <Text>{countItemBasket}</Text>
                <Button
                  size={'s'}
                  onClick={() => addItemInBasket()}
                  label={'+'}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShopPageItem;
