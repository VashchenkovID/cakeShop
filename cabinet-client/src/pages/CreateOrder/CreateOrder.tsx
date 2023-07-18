import React, { useEffect, useMemo, useState } from "react";

import styles from "./CreateOrder.module.styl";
import cn from "classnames/bind";
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import { Modal } from "@consta/uikit/Modal";
import { DatePicker } from "@consta/uikit/DatePicker";
import { useNavigate } from "react-router-dom";
import { Text } from "@consta/uikit/Text";
import PhoneInput from "react-phone-input-2";

import { nanoid } from "nanoid";
import { useAppSelector } from "src/hooks/useAppSelector";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import ordersApi from "../../api/requests/ordersApi";
import { LocalStorageKeysEnum, PublicRoutesEnum } from "src/utils/enum";
import { setBasket } from "src/store/features/basket/BasketSlice";
import CreateOrderCakeItem, {
  OrderBasketChangeDecors,
} from "./CreateOrderCakeItem/CreateOrderCakeItem";
import { DecorUserModel } from "src/api/models/DecorUserModel";
import useRequest from "../../hooks/useRequest";
import cakesApi from "../../api/requests/cakesApi";
import {storageUser} from "src/utils/storage";

interface UserCreateOrderType {
  name: string;
  phone: string;
  email?: string;
  order_date: Date | null;
}

const cx = cn.bind(styles);

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const user = storageUser()
  const [modal, setModal] = useState(false);
  const [orderDecors, setOrderDecors] = useState<OrderBasketChangeDecors[]>([]);
  const [notAuthUser, setNotAuthUser] = useState<UserCreateOrderType>({
    name: "",
    phone: "",
    email: "",
    order_date: null,
  });
  const [decors, setDecors] = useState<DecorUserModel[]>([]);
  const { load: fetchDecors } = useRequest(cakesApi.getDecor, (data) => {
    if (data) setDecors(data.data);
  });

  const allCount = useMemo(() => {
    if (basket && basket.items.length > 0) {
      return (
        basket.items.reduce(
          (accum, item) =>
            accum + item.price * item.count * item.countWeightType,
          0
        ) +
        basket.items
          .map((b) =>
            b.decors
              .map((d) =>
                d.items.reduce(
                  (acc, itm) => acc + itm.count * itm.pricePerUnit,
                  0
                )
              )
              .reduce((acc, el) => acc + el, 0)
          )
          .reduce((acc, el) => acc + el, 0)
      );
    } else return null;
  }, [basket]);
  const minOrderDate = useMemo(() => {
    const date = new Date();
    date.setDate(new Date().getDate() + 3);
    return new Date(date);
  }, []);

  const createNewIndividualOrder = async () => {
    await ordersApi
      .createNewIndividualOrder({
        name: `Индивидуальный заказ ${notAuthUser.name}`,
        customer: {
          fullName: notAuthUser.name,
          phone: notAuthUser.phone,
          email: notAuthUser.email,
        },
        date_completed: notAuthUser.order_date
          ? notAuthUser.order_date.toISOString()
          : undefined,
        items: basket
          ? basket.items.map((item) => {
              return {
                ...item,
                price: item.price * item.countWeightType,
                decors:
                  item.decors.length > 0 && item.decors[0].items.length > 0
                    ? item.decors
                    : undefined,
              };
            })
          : [],
      })
      .then(() => {
        setNotAuthUser({
          name: "",
          phone: "",
          email: "",
          order_date: null,
        });
        navigate(`${PublicRoutesEnum.SHOP}`);
        dispatch(setBasket(null));
      });
  };

  const createNewBasketOrder = async () => {
    if (user.id && basket && notAuthUser.order_date) {
      await ordersApi
        .createNewUserOrder({
          name: `Заказ пользователя ${user.name}`,
          date_completed: notAuthUser.order_date.toISOString(),
          items: basket.items.map((item) => {
            return {
              ...item,
              price: item.price * item.countWeightType,
              decors:
                item.decors.length > 0 && item.decors[0].items.length > 0
                  ? item.decors
                  : undefined,
            };
          }),
          user_id: user.id,
        })
        .then(() => {
          setNotAuthUser({
            name: "",
            phone: "",
            email: "",
            order_date: null,
          });
          navigate(`${PublicRoutesEnum.SHOP}`);
          dispatch(setBasket(null));
        });
    }
  };

  useEffect(() => {
    fetchDecors();
  }, []);

  useEffect(() => {
    if (decors) {
      setOrderDecors(
        decors.map((d) => {
          return { ...d, isChecked: false, localId: nanoid() };
        })
      );
    }
  }, [decors]);
  useEffect(() => {
    localStorage.setItem("Basket", JSON.stringify(basket));
  }, [basket]);

  return (
    <section className={styles.Order}>
      <Text size={"3xl"}>Ваш заказ</Text>
      {!basket || basket.items.length === 0 ? (
        <div className={styles.Order__not}>
          <Text>Вы не выбрали ни один десерт</Text>
        </div>
      ) : (
        <div className={styles.Order__rows}>
          <div className={styles.Order__rows}>
            {basket.items.map((item, index) => (
              <CreateOrderCakeItem
                orderDecors={orderDecors}
                setOrderDecors={setOrderDecors}
                item={item}
                key={index}
                decors={decors}
              />
            ))}
          </div>
          {allCount && <Text>Итого: {allCount},00 ₽</Text>}
          <Button
            className={styles.button}
            onClick={() => setModal(true)}
            label={"Оформить"}
          />
        </div>
      )}
      <Modal isOpen={modal} onClickOutside={() => setModal(false)}>
        {user ? (
          <div className={styles.UserModal}>
            <Text className={styles.modalTitle} size={"2xl"} >
              Оформление заказа
            </Text>
            <DatePicker
              label={"Дата выдачи заказа"}
              value={notAuthUser.order_date}
              minDate={minOrderDate}
              onChange={({ value }) =>
                setNotAuthUser((prevState) => {
                  return { ...prevState, order_date: value };
                })
              }
            />
            <Button
              label={"Оформить"}
              onClick={createNewBasketOrder}
              disabled={!notAuthUser.order_date}
            />
          </div>
        ) : (
          <div className={styles.NotUserModal}>
            <Text className={styles.modalTitle} size={"2xl"}>
              Оформление заказа
            </Text>
            <TextField
              label={"Имя"}
              placeholder={"Введите имя"}
              value={notAuthUser.name}
              onChange={({ value }) =>
                setNotAuthUser((prevState) => {
                  return { ...prevState, name: value || "" };
                })
              }
            />
            <PhoneInput
              specialLabel={"Номер телефона"}
              containerClass={styles.NotUserModal__phoneContainer}
              inputClass={cx(styles.NotUserModal__phoneInput)}
              placeholder={"Введите номер телефона"}
              country={"ru"}
              value={notAuthUser.phone}
              onChange={(value) =>
                setNotAuthUser((prevState) => {
                  return {
                    ...prevState,
                    phone: value
                      .split("")
                      .map((elem, index) => (index === 0 ? "7" : elem))
                      .join(""),
                  };
                })
              }
            />
            <TextField
              label={"Почта"}
              placeholder={"Введите почтовый адрес"}
              value={notAuthUser.email}
              onChange={({ value }) =>
                setNotAuthUser((prevState) => {
                  return { ...prevState, email: value || "" };
                })
              }
            />
            <DatePicker
              label={"Дата выдачи"}
              placeholder={"Выберите дату выдачи заказа"}
              value={notAuthUser.order_date}
              minDate={minOrderDate}
              onChange={({ value }) =>
                setNotAuthUser((prevState) => {
                  return { ...prevState, order_date: value };
                })
              }
            />
            <Button
              className={styles.btn}
              label={"Оформить"}
              onClick={createNewIndividualOrder}
              view={
                notAuthUser.name === "" ||
                notAuthUser.phone === "" ||
                !notAuthUser.order_date
                  ? "ghost"
                  : "primary"
              }
              disabled={
                notAuthUser.name === "" ||
                notAuthUser.phone === "" ||
                !notAuthUser.order_date
              }
            />
          </div>
        )}
      </Modal>
    </section>
  );
};

export default CreateOrder;
