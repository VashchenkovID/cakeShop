import React, { useRef } from 'react';
import styles from './CreateOrderCakeItem.styl';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconTrash } from '@consta/uikit/IconTrash';
import { setBasket } from 'src/redux/features/basket/BasketSlice';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import { LocalStorageKeysEnum } from 'src/utils/enum';

interface IComponentProps {
  item: {
    id: number;
    name: string;
    deviceId: number;
    basketId: number;
    count: number;
    price: number;
    weightType: string;
    countWeightType: number;
    decors: {
      id: number;
      name: string;
      items: {
        id: number;
        name: string;
        count: string;
        countType: string;
        price: number;
        constPrice: number;
      }[];
    }[];
  };
}

const CreateOrderCakeItem: React.FC<IComponentProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const userId = localStorage.getItem(LocalStorageKeysEnum.ID);
  const ref = useRef(item.countWeightType);
  console.log(ref);
  const addWeightCountInBasket = async (item: {
    id: number | null;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
    weightType: string;
    countWeightType: number;
  }) => {
    if (userId) {
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.id === item.id) {
                  return { ...i, countWeightType: i.countWeightType + 1 };
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
                  decors: [],
                  weightType: item.weightType,
                  countWeightType: item.countWeightType,
                },
              ],
            }),
          );
        }
      }
    } else {
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.id === item.id) {
                  return { ...i, countWeightType: i.countWeightType + 1 };
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
                  decors: [],
                  weightType: item.weightType,
                  countWeightType: item.countWeightType,
                },
              ],
            }),
          );
        }
      }
    }
  };
  const addItemInBasket = async (item: {
    id: number | null;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
    weightType: string;
    countWeightType: number;
  }) => {
    if (userId) {
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
                  decors: [],
                  weightType: item.weightType,
                  countWeightType: item.countWeightType,
                },
              ],
            }),
          );
        }
      }
    } else {
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
                  decors: [],
                  weightType: item.weightType,
                  countWeightType: item.countWeightType,
                },
              ],
            }),
          );
        }
      }
    }
  };
  const removeItemInBasket = async (item: {
    id: number | null;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
    weightType: string;
    countWeightType: number;
  }) => {
    if (userId) {
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
                  decors: [],
                  weightType: item.weightType,
                  countWeightType: item.countWeightType,
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
                decors: [],
                weightType: item.weightType,
                countWeightType: item.countWeightType,
              },
            ],
          }),
        );
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
                  decors: [],
                  weightType: item.weightType,
                  countWeightType: item.countWeightType,
                },
              ],
            }),
          );
        }
      }
    }
  };
  const removeWeightCountInBasket = async (item: {
    id: number | null;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
    weightType: string;
    countWeightType: number;
  }) => {
    if (userId) {
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.id === item.id) {
                  if (i.countWeightType <= ref.current) {
                    return { ...i, countWeightType: ref.current };
                  }
                  return { ...i, countWeightType: i.countWeightType - 1 };
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
                  count: ref.current,
                  price: item.price,
                  basketId: null,
                  decors: [],
                  weightType: item.weightType,
                  countWeightType: item.countWeightType,
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
                decors: [],
                weightType: item.weightType,
                countWeightType: item.countWeightType,
              },
            ],
          }),
        );
      }
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.id === item.id) {
                  if (i.countWeightType <= ref.current) {
                    return { ...i, countWeightType: ref.current };
                  }
                  return { ...i, countWeightType: i.countWeightType - 1 };
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
                  count: ref.current,
                  price: item.price,
                  basketId: null,
                  decors: [],
                  weightType: item.weightType,
                  countWeightType: item.countWeightType,
                },
              ],
            }),
          );
        }
      }
    }
  };
  return (
    <div className={styles.CakeItem}>
      <Text size={'xl'}>{item.name}</Text>

      <Text className={styles.CakeItem__basketActions}>
        <Button
          size={'s'}
          label={'-'}
          onClick={() => removeItemInBasket(item)}
        />
        <Text size={'xl'}>{item.count}</Text>
        <Button size={'s'} onClick={() => addItemInBasket(item)} label={'+'} />
      </Text>
      <Text className={styles.CakeItem__basketActions} size={'xl'}>
        <Button
          size={'s'}
          label={'-'}
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
        {Number(item.count) * Number(item.price) * Number(item.countWeightType)}
        ,00 ₽
        <Button
          size={'s'}
          iconLeft={IconTrash}
          onClick={() => {
            dispatch(
              setBasket({
                ...basket,
                items: basket.items.filter((elem) => elem.id !== item.id),
              }),
            );
          }}
        />
      </Text>
    </div>
  );
};

export default CreateOrderCakeItem;
