
import { MutableRefObject } from 'react';
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectBasket} from "../../../store/features/basket/BasketSelectors";
import {LocalStorageKeysEnum} from "../../../utils/enum";
import {setBasket} from "../../../store/features/basket/BasketSlice";
import {BasketModel} from "../../../api/models/BasketModel";


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
    id: number;
    localId: string;
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
                if (i.localId === item.localId) {
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
                  localId: item.localId,
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
            } as BasketModel),
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
                if (i.localId === item.localId) {
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
                  localId: item.localId,
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
    id: number;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
    weightType: string;
    countWeightType: number;
    localId: string;
  }) => {
    if (userId) {
      if (basket) {
        if (basket.items.find((elem) => elem.id === item.id)) {
          dispatch(
            setBasket({
              ...basket,
              items: basket.items.map((i) => {
                if (i.localId === item.localId) {
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
                  localId: item.localId,
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
                localId: item.localId,
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
                if (i.localId === item.localId) {
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
                  localId: item.localId,
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
    removeWeightCountInBasket,
    addWeightCountInBasket,
  };
};

export default useCreateOrderCakeItem;