import React, { useMemo, useState } from 'react';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoutesEnum, PublicRoutesEnum } from 'src/router';
import style from './Auth.styl';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import PhoneInput from 'react-phone-input-2';
import { Button } from '@consta/uikit/Button';
import AuthService from 'src/api/requests/userAPI';
import { toast } from 'react-toastify';

const AuthContainer: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const clearInputs = () => {
    setLogin('');
    setPassword('');
  };

  const enterInApp = async () => {
    if (location.pathname.includes(PublicRoutesEnum.AUTH)) {
      setLoading(true);
      await AuthService.registration({
        email: login,
        password: password,
        fullName: name,
        phone: phone,
      })
        .then((r) => {
          dispatch(setIsAuth(true));
          localStorage.setItem(LocalStorageKeysEnum.TOKEN, r.data.accessToken);
          localStorage.setItem(LocalStorageKeysEnum.ROLE, r.data.user.role);
          localStorage.setItem(LocalStorageKeysEnum.NAME, r.data.user.name);
          localStorage.setItem(LocalStorageKeysEnum.PHONE, r.data.user.phone);
          localStorage.setItem(LocalStorageKeysEnum.ID, String(r.data.user.id));
          clearInputs();
          setLoading(false);
        })
        .catch((r) => {
          toast.error(r.response.data.message);
          setLoading(false);
        });
    }
    if (location.pathname.includes(PublicRoutesEnum.LOGIN)) {
      setLoading(true);
      await AuthService.login({
        email: login,
        password: password,
      })
        .then(async (r) => {
          dispatch(setIsAuth(true));
          localStorage.setItem(LocalStorageKeysEnum.TOKEN, r.data.accessToken);
          localStorage.setItem(LocalStorageKeysEnum.ROLE, r.data.user.role);
          localStorage.setItem(LocalStorageKeysEnum.NAME, r.data.user.name);
          localStorage.setItem(LocalStorageKeysEnum.PHONE, r.data.user.phone);
          localStorage.setItem(LocalStorageKeysEnum.ID, String(r.data.user.id));
          clearInputs();
          navigate(PrivateRoutesEnum.ADMINISTRATION);
          setLoading(false);
        })
        .catch((r) => {
          toast.error(r.response.data.message);
          setLoading(false);
        });
    }
  };

  const disabled = useMemo(() => {
    if (location.pathname.includes(PublicRoutesEnum.AUTH)) {
      return (
        login === '' ||
        password === '' ||
        name === '' ||
        phone === '' ||
        !login ||
        !password ||
        !name ||
        !phone
      );
    } else return login === '' || password === '' || !login || !password;
  }, [location.pathname, login, name, password, phone]);

  return (
    <>
      <div className={style.Container}>
        <div className={style.Container__body}>
          <Text size={'3xl'} className={style.Container__title}>
            {location.pathname.includes(PublicRoutesEnum.AUTH)
              ? 'Регистрация'
              : 'Авторизация'}
          </Text>
          <TextField
            size={'s'}
            label={'Логин'}
            placeholder={'Логин'}
            width={'full'}
            id="outlined-basic"
            value={login}
            onChange={({ value }) => {
              setLogin(value);
            }}
          />
          <TextField
            type={'password'}
            placeholder={'Пароль'}
            label={'Пароль'}
            size={'s'}
            width={'full'}
            id="outlined-basic"
            value={password}
            onChange={({ value }) => {
              setPassword(value);
            }}
          />
          {location.pathname.includes(PublicRoutesEnum.AUTH) && (
            <TextField
              size={'s'}
              width={'full'}
              placeholder={'Введите имя'}
              label={'Имя'}
              value={name}
              onChange={({ value }) => {
                setName(value);
              }}
            />
          )}
          {location.pathname.includes(PublicRoutesEnum.AUTH) && (
            <PhoneInput
              specialLabel={'Номер телефона'}
              containerClass={style.Container__phoneContainer}
              inputClass={style.Container__phoneInput}
              placeholder={'Введите номер телефона'}
              country={'ru'}
              value={phone}
              onChange={(value) =>
                setPhone(
                  value
                    .split('')
                    .map((elem, index) => (index === 0 ? '7' : elem))
                    .join(''),
                )
              }
            />
          )}
          {location.pathname.includes(PublicRoutesEnum.LOGIN) ? (
            <Text
              size={'s'}
              onClick={() => {
                navigate(PublicRoutesEnum.AUTH);
              }}
            >
              Еще не зарегистрированы? Регистрация
            </Text>
          ) : (
            <Text
              size={'s'}
              onClick={() => {
                navigate(PublicRoutesEnum.LOGIN);
              }}
            >
              Уже зарегистрированы? Войти
            </Text>
          )}

          <Button
            size={'s'}
            width={'full'}
            onClick={enterInApp}
            label={'Вход'}
            view={disabled ? 'ghost' : 'primary'}
            disabled={disabled}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
