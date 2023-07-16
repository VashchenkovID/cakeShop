import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { DeviceListModel } from "src/api/models/DeviceListModel";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { PublicRoutesEnum } from "src/utils/enum";
import { setBasket } from "src/store/features/basket/BasketSlice";
import { nanoid } from "@reduxjs/toolkit";
import { IconFavorite } from "@consta/uikit/IconFavorite";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import styles from "./CatalogItem.module.styl";
import cn from "classnames/bind";
import CatalogItemPrice from "../CatalogItemPrice/CatalogItemPrice";
import { useNavigate } from "react-router-dom";
import { storageUser } from "src/utils/storage";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
interface IComponentProps {
  item: DeviceListModel;
  width: number;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}
const cx = cn.bind(styles);
const CatalogItem: React.FC<IComponentProps> = ({ item, width, setModal }) => {
  console.log('123123test')
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const user = storageUser();
  const [isAdded, setIsAdded] = useState(false);
  const addItemInBasket = async () => {
    if (user && user.id) {
      if (!basket) {
        dispatch(
          setBasket({
            id: null,
            name: `Заказ пользователя ${user.name}`,
            user_id: Number(user.id),
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
    if (user && user.id) {
      if (!basket) {
        dispatch(
          setBasket({
            id: null,
            name: `Заказ пользователя ${user.name}`,
            user_id: Number(user.id),
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
              ...basket.items.filter((i) => i.id !== item.id),
              ...basket.items
                .filter((i) => i.id === item.id)
                .filter((el, ind, arr) => ind !== arr.length - 1),
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
  console.log(import.meta.env.VITE_API_URL_IMAGE)
  return (
    <div>
      <ComponentStyleWrapper>
        <div
          className={styles.Item}
          onClick={() =>
            navigate(`${PublicRoutesEnum.VIEW_DESSERT}/${item.id}`)
          }
        >
          <div className={styles.Item__header}>
            <img
              className={styles.Item__image}
              src={`http://84.38.180.242:8081/${item.img}`}
            />
            <div className={styles.Item__title}>
              <Text weight={"semibold"}>Тестовое имя</Text>
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
      </ComponentStyleWrapper>
    </div>
  );
};

export default CatalogItem;
