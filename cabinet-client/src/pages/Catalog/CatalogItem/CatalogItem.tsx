import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { DeviceListModel } from "../../../api/models/DeviceListModel";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectBasket } from "../../../store/features/basket/BasketSelectors";
import { LocalStorageKeysEnum, PublicRoutesEnum } from "../../../utils/enum";
import { setBasket } from "../../../store/features/basket/BasketSlice";
import { nanoid } from "@reduxjs/toolkit";
import { IconFavorite } from "@consta/uikit/IconFavorite";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import styles from "./CatalogItem.module.styl";
import cn from "classnames/bind";
import CatalogItemPrice from "../CatalogItemPrice/CatalogItemPrice";
import { useResize } from "../../../hooks/useResize";
import { useNavigate } from "react-router-dom";
interface IComponentProps {
  item: DeviceListModel;
  width: number;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}
const cx = cn.bind(styles);
const CatalogItem: React.FC<IComponentProps> = ({ item, width, setModal }) => {
  const navigate = useNavigate();
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
          })
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
          })
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
          })
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
          })
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
          })
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
          })
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
          })
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
          })
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
  useEffect(() => {
    localStorage.setItem("Basket", JSON.stringify(basket));
  }, [basket]);
  return (
    <div>
      <div
        className={styles.Item}
        onClick={() => navigate(`${PublicRoutesEnum.VIEW_DESSERT}/${item.id}`)}
      >
        <div className={styles.Item__header}>
          <img
            className={styles.Item__image}
            src={`${import.meta.env.VITE_API_URL_IMAGE}${item.img}`}
          />
          <div className={styles.Item__title}>
            <Text weight={"semibold"}>{item.name}</Text>
            <div className={styles.Item__rating}>
              <Text size={"s"} className={styles.Item__rating__text}>
                {Math.floor(item.rating * 100) / 100}
              </Text>
              <IconFavorite
                className={cx(styles.Item__rating__icon, {
                  colored: item.rating > 0,
                })}
              />
            </div>
          </div>
        </div>
        <div className={styles.Item__basket}>
          <CatalogItemPrice
            price={item.price}
            countWeightType={item.countWeightType}
            discount={item.discount}
          />
          {width >= 1000 && (
            <div className={styles.Item__button}>
              {!isAdded ? (
                <Button
                  size={"xs"}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItemInBasket();
                  }}
                  label={"Добавить"}
                />
              ) : (
                <div className={styles.Item__addActions}>
                  <Button
                    size={"xs"}
                    label={"-"}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItemInBasket();
                    }}
                  />
                  <Text>{countItemBasket}</Text>
                  <Button
                    size={"xs"}
                    onClick={(e) => {
                      e.stopPropagation();
                      addItemInBasket();
                    }}
                    label={"+"}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {width < 1000 ? (
          <div className={styles.Item__footer}>
            <Button
              size={"xs"}
              label={"Купить в 1 клик"}
              onClick={(e) => {
                e.stopPropagation();
                addItemInBasket();
                setModal(true);
              }}
            />

            <div className={styles.Item__button}>
              {!isAdded ? (
                <Button
                  size={"xs"}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItemInBasket();
                  }}
                  label={"Добавить"}
                />
              ) : (
                <div className={styles.Item__addActions}>
                  <Button
                    size={"xs"}
                    label={"-"}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItemInBasket();
                    }}
                  />
                  <Text>{countItemBasket}</Text>
                  <Button
                    size={"xs"}
                    onClick={(e) => {
                      e.stopPropagation();
                      addItemInBasket();
                    }}
                    label={"+"}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <Button
            size={"s"}
            label={"Купить в 1 клик"}
            onClick={(e) => {
              e.stopPropagation();
              addItemInBasket();
              setModal(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CatalogItem;
