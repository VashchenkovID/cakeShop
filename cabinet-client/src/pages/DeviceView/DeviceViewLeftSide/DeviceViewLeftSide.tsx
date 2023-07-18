import React, { useEffect, useMemo, useState } from "react";
import ComponentStyleWrapper from "../../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import styles from "../DeviceView.module.styl";
import cn from "classnames/bind";
import { Text } from "@consta/uikit/Text";
import Textarea from "../../../components/Textarea/Textarea";
import { IconFavorite } from "@consta/uikit/IconFavorite";
import { Button } from "@consta/uikit/Button";
import { DeviceItemModel } from "src/api/models/DeviceItemModel";
import { setBasket } from "src/store/features/basket/BasketSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { Modal } from "@consta/uikit/Modal";
import DeviceCreateRatingModal from "../Modals/DeviceCreateRatingModal";
import { GetDeviceRatingsReqType } from "src/api/requests/ratingsApi";
import DeviceCreateOneClickBasket from "../Modals/DeviceCreateOneClickBasket/DeviceCreateOneClickBasket";
import { storageUser } from "src/utils/storage";

interface IComponentProps {
  device: DeviceItemModel;
  width: number;
  fetchRatings: (data: GetDeviceRatingsReqType) => void;
  fetchDevice: (id: string) => void;
}

export enum DeviceModalEnum {
  IDLE = "idle",
  CREATE_RATING = "create_rating",
  CREATE_BASKET = "create_basket",
}

const cx = cn.bind(styles);
const DeviceViewLeftSide: React.FC<IComponentProps> = ({
  device,
  width,
  fetchRatings,
  fetchDevice,
}) => {
  // store
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const user = storageUser();
  // state
  const [isAdded, setIsAdded] = useState(false);
  const [modal, setModal] = useState<DeviceModalEnum>(DeviceModalEnum.IDLE);
  const [isView, setIsView] = useState(false);
  //func
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
                id: device.id,
                localId: nanoid(),
                name: device.name,
                deviceId: device.id,
                count: 1,
                price: device.price,
                basketId: null,
                countWeightType: device.countWeightType,
                weightType: device.weightType,
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
                id: device.id,
                name: device.name,
                localId: nanoid(),
                deviceId: device.id,
                count: 1,
                price: device.price,
                basketId: null,
                countWeightType: device.countWeightType,
                weightType: device.weightType,
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
                id: device.id,
                localId: nanoid(),
                name: device.name,
                deviceId: device.id,
                count: 1,
                price: device.price,
                basketId: null,
                countWeightType: device.countWeightType,
                weightType: device.weightType,
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
                id: device.id,
                localId: nanoid(),
                name: device.name,
                deviceId: device.id,
                count: 1,
                price: device.price,
                basketId: null,
                countWeightType: device.countWeightType,
                weightType: device.weightType,
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
                id: device.id,
                localId: nanoid(),
                name: device.name,
                deviceId: device.id,
                count: 1,
                price: device.price,
                basketId: null,
                countWeightType: device.countWeightType,
                weightType: device.weightType,
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
              ...basket.items.filter((i) => i.id !== device.id),
              ...basket.items
                .filter((i) => i.id === device.id)
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
                id: device.id,
                localId: nanoid(),
                name: device.name,
                deviceId: device.id,
                count: 1,
                price: device.price,
                basketId: null,
                countWeightType: device.countWeightType,
                weightType: device.weightType,
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
              ...basket.items.filter((i) => i.id !== device.id),
              ...basket.items
                .filter((i) => i.id === device.id)
                .filter((el, ind, arr) => ind !== arr.length - 1),
            ],
          })
        );
      }
    }
  };
  const openCreateRating = () => {
    setModal(DeviceModalEnum.CREATE_RATING);
  };
  const onClose = () => {
    setModal(DeviceModalEnum.IDLE);
  };
  //computed
  const countItemBasket = useMemo(() => {
    if (basket && device) {
      if (basket.items.length > 0) {
        return basket.items.filter((i) => i.id === device.id).length;
      } else return 0;
    } else return 0;
  }, [basket]);
  // sideEffects
  useEffect(() => {
    if (
      device &&
      basket &&
      basket.items.find((elem) => elem.id === device.id)
    ) {
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
    <ComponentStyleWrapper>
      <div className={styles.Device__leftSide}>
        <div className={styles.Device__wrapper}>
          <img
            src={`${import.meta.env.VITE_API_URL_IMAGE}/${device.img}`}
            className={styles.Device__wrapper__img}
          />
        </div>

        <Text
          align={width <= 500 ? "center" : undefined}
          size={width >= 500 ? "3xl" : "m"}
        >
          {device.name}
        </Text>
        {width >= 800 ? (
          <Textarea
            className={styles.Device__description}
            text={device.description || ""}
            size={width >= 500 ? "m" : "s"}
          />
        ) : (
          <div>
            {isView ? (
              <div>
                <Textarea
                  className={styles.Device__description}
                  text={device.description || ""}
                  size={width >= 500 ? "m" : "s"}
                />
                <span
                  className={styles.Device__openDescription}
                  onClick={() => setIsView(false)}
                >
                  Скрыть
                </span>
              </div>
            ) : (
              <Text size={width >= 500 ? "m" : "s"}>
                {device.description.slice(0, 100)}...{" "}
                <span
                  className={styles.Device__openDescription}
                  onClick={() => setIsView(true)}
                >
                  Подробнее
                </span>
              </Text>
            )}
          </div>
        )}

        <div>
          {device && (
            <div className={styles.Device__ratingWrapper}>
              <Text>Рейтинг:</Text>
              <div className={styles.Device__rating}>
                <Text size={"s"} className={styles.Device__rating__text}>
                  {Math.floor(device.rating * 100) / 100}
                </Text>
                <IconFavorite
                  className={cx(styles.Device__rating__icon, {
                    colored: device.rating > 0,
                  })}
                />
              </div>
            </div>
          )}

          <Text>Цена: {device.price} ₽</Text>
        </div>
        <div className={styles.Device__actions}>
          <div>
            {!isAdded ? (
              <div className={styles.Device__leftSide__actions}>
                <Button
                  size={width <= 800 ? "xs" : "s"}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItemInBasket();
                  }}
                  label={"Добавить"}
                />
                <Button
                  size={width <= 800 ? "xs" : "s"}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItemInBasket();
                    setModal(DeviceModalEnum.CREATE_BASKET);
                  }}
                  label={"Купить в 1 клик"}
                />
              </div>
            ) : (
              <div className={styles.Device__leftSide__actions}>
                <Button
                  size={width <= 800 ? "xs" : "s"}
                  label={"-"}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItemInBasket();
                  }}
                />
                <Text>{countItemBasket}</Text>
                <Button
                  size={width <= 800 ? "xs" : "s"}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItemInBasket();
                  }}
                  label={"+"}
                />
              </div>
            )}
          </div>
          <Button
            label={"Оставить отзыв"}
            size={width <= 800 ? "xs" : "s"}
            onClick={openCreateRating}
          />
        </div>
      </div>
      <Modal isOpen={modal === DeviceModalEnum.CREATE_RATING}>
        <DeviceCreateRatingModal
          onClose={onClose}
          deviceName={device.name}
          device_id={device.id}
          width={width}
          fetchRatings={fetchRatings}
          fetchDevice={fetchDevice}
        />
      </Modal>
      <Modal isOpen={modal === DeviceModalEnum.CREATE_BASKET}>
        <DeviceCreateOneClickBasket
          modal={modal}
          setModal={setModal}
          width={width}
        />
      </Modal>
    </ComponentStyleWrapper>
  );
};

export default DeviceViewLeftSide;
