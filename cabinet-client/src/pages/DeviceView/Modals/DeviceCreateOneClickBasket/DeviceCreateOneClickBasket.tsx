import React, { SetStateAction, useMemo, useState } from "react";
import { DeviceModalEnum } from "../../DeviceViewLeftSide/DeviceViewLeftSide";
import styles from "./DeviceCreateOneClickBasket.module.styl";
import { Text } from "@consta/uikit/Text";
import { DatePicker } from "@consta/uikit/DatePicker";
import { Button } from "@consta/uikit/Button";
import { TextField } from "@consta/uikit/TextField";
import PhoneInput from "react-phone-input-2";
import { PublicRoutesEnum } from "src/utils/enum";
import ordersApi from "../../../../api/requests/ordersApi";
import { setBasket } from "src/store/features/basket/BasketSlice";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import cn from "classnames/bind";
import { IconClose } from "@consta/uikit/IconClose";
import { storageUser } from "src/utils/storage";

interface IComponentProps {
  modal: DeviceModalEnum;
  setModal: React.Dispatch<SetStateAction<DeviceModalEnum>>;
  width: number;
}
interface UserCreateOrderType {
  name: string;
  phone: string;
  email?: string;
  order_date: Date | null;
}

const cx = cn.bind(styles);
const DeviceCreateOneClickBasket: React.FC<IComponentProps> = ({
  modal,
  setModal,
  width,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const user = storageUser();
  const [notAuthUser, setNotAuthUser] = useState<UserCreateOrderType>({
    name: "",
    phone: "",
    email: "",
    order_date: null,
  });
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
        onClose();
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
          onClose();
        });
    }
  };
  const onClose = () => {
    dispatch(setBasket(null));
    setModal(DeviceModalEnum.IDLE);
  };
  return (
    <div>
      {user ? (
        <div className={styles.UserModal}>
          <div className={styles.modalHeader}>
            <Text size={width <= 500 ? "m" : "2xl"}>Оформление заказа</Text>
            <Button
              view={"clear"}
              iconLeft={IconClose}
              onClick={onClose}
              size={"s"}
            />
          </div>

          <DatePicker
            size={width <= 500 ? "xs" : "s"}
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
            size={width <= 500 ? "xs" : "s"}
            label={"Оформить"}
            onClick={createNewBasketOrder}
            disabled={!notAuthUser.order_date}
          />
        </div>
      ) : (
        <div className={styles.NotUserModal}>
          <div className={styles.modalHeader}>
            <Text size={width <= 500 ? "m" : "2xl"}>Оформление заказа</Text>
            <Button
              view={"clear"}
              iconLeft={IconClose}
              onClick={onClose}
              size={"s"}
            />
          </div>
          <TextField
            size={width <= 500 ? "xs" : "s"}
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
            size={width <= 500 ? "xs" : "s"}
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
            size={width <= 500 ? "xs" : "s"}
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
            size={width <= 500 ? "xs" : "s"}
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
    </div>
  );
};

export default DeviceCreateOneClickBasket;
