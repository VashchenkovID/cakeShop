import { setBasket } from 'src/redux/features/basket/BasketSlice';
import { dispatch } from 'src/redux/store';
import { MutableRefObject } from 'react';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import { LocalStorageKeysEnum } from 'src/utils/enum';

export interface CreateOrderCakeItemType {
  id: number | null;
  name: string;
  deviceId: number;
  basketId: number | null;
  count: number;
  price: number;
  weightType: string;
  countWeightType: number;
}

const useCreateOrderCakeItem = (
  item: CreateOrderCakeItemType,
  ref: MutableRefObject<number>,
) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const userId = localStorage.getItem(LocalStorageKeysEnum.ID);
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
  return {
    removeItemInBasket,
    removeWeightCountInBasket,
    addItemInBasket,
    addWeightCountInBasket,
  };
};

export default useCreateOrderCakeItem;
