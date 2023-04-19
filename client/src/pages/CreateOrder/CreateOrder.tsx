import React, { useMemo, useState } from 'react';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import styles from './CreateOrder.styl';
import cn from 'classnames/bind';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { DatePicker } from '@consta/uikit/DatePicker';
import ordersApi from 'src/api/requests/ordersApi';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setBasket } from 'src/redux/features/basket/BasketSlice';
import { Text } from '@consta/uikit/Text';
import { IconTrash } from '@consta/uikit/IconTrash';
import PhoneInput from 'react-phone-input-2';

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
  const userId = localStorage.getItem(LocalStorageKeysEnum.ID);
  const [modal, setModal] = useState(false);
  const [notAuthUser, setNotAuthUser] = useState<UserCreateOrderType>({
    name: '',
    phone: '',
    email: '',
    order_date: null,
  });

  const user = localStorage.getItem(LocalStorageKeysEnum.NAME);
  const allCount = useMemo(() => {
    if (basket && basket.items.length > 0) {
      return basket.items.reduce(
        (accum, item) => accum + item.price * item.count,
        0,
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
        date_completed: notAuthUser.order_date.toISOString(),
        items: basket.items,
      })
      .then(() => {
        setNotAuthUser({
          name: '',
          phone: '',
          email: '',
          order_date: null,
        });
        navigate(`${PublicRoutesEnum.SHOP}`);
        dispatch(setBasket(null));
      });
  };

  const createNewBasketOrder = async () => {
    if (userId) {
      await ordersApi
        .createNewUserOrder({
          name: `Заказ пользователя ${user}`,
          date_completed: notAuthUser.order_date.toISOString(),
          items: basket.items,
          user_id: userId,
        })
        .then(() => {
          setNotAuthUser({
            name: '',
            phone: '',
            email: '',
            order_date: null,
          });
          navigate(`${PublicRoutesEnum.SHOP}`);
          dispatch(setBasket(null));
        });
    }
  };

  const addItemInBasket = async (item: {
    id: number | null;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
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
                },
              ],
            }),
          );
        }
      }
    }
  };

  return (
    <section className={styles.Order}>
      <Text size={'3xl'}>Ваш заказ</Text>
      {!basket ? (
        <div>Вы не выбрали ни один десерт</div>
      ) : (
        <div className={styles.Order__rows}>
          <div className={styles.Order__row}>
            <Text size={'3xl'}>Наименование</Text>
            <Text size={'3xl'}>Количество</Text>
            <Text size={'3xl'}>Цена за единицу</Text>
            <Text size={'3xl'}>Итог</Text>
          </div>
          <div className={styles.Order__rows}>
            {basket.items.map((item, index) => (
              <div className={styles.Order__row} key={index}>
                <Text size={'xl'}>{item.name}</Text>

                <Text className={styles.Order__basketActions}>
                  <Button
                    size={'s'}
                    label={'-'}
                    onClick={() => removeItemInBasket(item)}
                  />
                  <Text size={'xl'}>{item.count}</Text>
                  <Button
                    size={'s'}
                    onClick={() => addItemInBasket(item)}
                    label={'+'}
                  />
                </Text>
                <Text size={'xl'}>{item.price},00 ₽</Text>
                <Text className={styles.Order__actions} size={'2xl'}>
                  {Number(item.count) * Number(item.price)},00 ₽
                  <Button
                    size={'s'}
                    iconLeft={IconTrash}
                    onClick={() => {
                      dispatch(
                        setBasket({
                          ...basket,
                          items: basket.items.filter(
                            (elem) => elem.id !== item.id,
                          ),
                        }),
                      );
                    }}
                  />
                </Text>
              </div>
            ))}
            {allCount && <Text>Итого: {allCount},00 ₽</Text>}
          </div>
          <Button
            className={styles.button}
            onClick={() => setModal(true)}
            label={'Оформить'}
          />
        </div>
      )}
      <Modal isOpen={modal} onClickOutside={() => setModal(false)}>
        {user ? (
          <div className={styles.UserModal}>
            <Text className={styles.modalTitle} size={'2xl'}>
              Оформление заказа
            </Text>
            <DatePicker
              label={'Дата выдачи заказа'}
              value={notAuthUser.order_date}
              minDate={minOrderDate}
              onChange={({ value }) =>
                setNotAuthUser((prevState) => {
                  return { ...prevState, order_date: value };
                })
              }
            />
            <Button
              label={'Оформить'}
              onClick={createNewBasketOrder}
              disabled={!notAuthUser.order_date}
            />
          </div>
        ) : (
          <div className={styles.NotUserModal}>
            <Text className={styles.modalTitle} size={'2xl'}>
              Оформление заказа
            </Text>
            <TextField
              label={'Имя'}
              placeholder={'Введите имя'}
              value={notAuthUser.name}
              onChange={({ value }) =>
                setNotAuthUser((prevState) => {
                  return { ...prevState, name: value };
                })
              }
            />
            <PhoneInput
              specialLabel={'Номер телефона'}
              containerClass={styles.NotUserModal__phoneContainer}
              inputClass={cx(styles.NotUserModal__phoneInput)}
              placeholder={'Введите номер телефона'}
              country={'ru'}
              value={notAuthUser.phone}
              onChange={(value) =>
                setNotAuthUser((prevState) => {
                  return {
                    ...prevState,
                    phone: value
                      .split('')
                      .map((elem, index) => (index === 0 ? '7' : elem))
                      .join(''),
                  };
                })
              }
            />
            <TextField
              label={'Почта'}
              placeholder={'Введите почтовый адрес'}
              value={notAuthUser.email}
              onChange={({ value }) =>
                setNotAuthUser((prevState) => {
                  return { ...prevState, email: value };
                })
              }
            />
            <DatePicker
              label={'Дата выдачи'}
              placeholder={'Выберите дату выдачи заказа'}
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
              label={'Оформить'}
              onClick={createNewIndividualOrder}
              view={
                notAuthUser.name === '' ||
                notAuthUser.phone === '' ||
                !notAuthUser.order_date
                  ? 'ghost'
                  : 'primary'
              }
              disabled={
                notAuthUser.name === '' ||
                notAuthUser.phone === '' ||
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
