import React, { useState } from 'react';
import userAPI from 'src/api/requests/userAPI';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { useLocation, useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import style from './Auth.styl';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';

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
      await userAPI
        .registrationNewUser({
          email: login,
          password: password,
          fullName: name,
          phone: phone,
        })
        .then((r) => {
          dispatch(setIsAuth(true));
          localStorage.setItem(LocalStorageKeysEnum.TOKEN, r.token);
          localStorage.setItem(LocalStorageKeysEnum.ROLE, r.role);
          clearInputs();
          setLoading(false);
          navigate(PublicRoutesEnum.SHOP);
        })
        .catch((r) => {
          console.log(r.message);
          navigate(PublicRoutesEnum.AUTH);
          setLoading(false);
        });
    }
    if (location.pathname.includes(PublicRoutesEnum.LOGIN)) {
      setLoading(true);
      await userAPI
        .loginUser({
          email: login,
          password: password,
        })
        .then((r) => {
          dispatch(setIsAuth(true));
          localStorage.setItem(LocalStorageKeysEnum.TOKEN, r.data.token);
          localStorage.setItem(LocalStorageKeysEnum.ROLE, r.data.role);
          localStorage.setItem(LocalStorageKeysEnum.NAME, r.data.name);
          localStorage.setItem(LocalStorageKeysEnum.PHONE, r.data.phone);
          clearInputs();
          navigate(PublicRoutesEnum.SHOP);
          setLoading(false);
        })
        .catch((r) => {
          console.log(r.message);
          navigate(PublicRoutesEnum.LOGIN);
          setLoading(false);
        });
    }
  };
  return (
    <>
      {loading ? (
        <ScreenLoader />
      ) : (
        <div className={style.Container}>
          <div className={style.Container__body}>
            <h1 className={style.Container__title}>
              {location.pathname.includes(PublicRoutesEnum.AUTH)
                ? 'Регистрация'
                : 'Авторизация'}
            </h1>
            <input
              placeholder={'Логин'}
              id="outlined-basic"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
            <input
              placeholder={'Пароль'}
              id="outlined-basic"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {location.pathname.includes(PublicRoutesEnum.AUTH) && (
              <div>
                <input
                  placeholder={'Имя'}
                  id="outlined-basic"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  id="outlined-basic"
                  placeholder={'Телефон'}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            )}

            <button onClick={enterInApp}>Вход</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthContainer;
