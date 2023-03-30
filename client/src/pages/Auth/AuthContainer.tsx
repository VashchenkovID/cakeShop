import React, { useState } from 'react';
import userAPI from 'src/api/requests/userAPI';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { useLocation, useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import { Button, TextField } from '@mui/material';
import style from './Auth.styl';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';

const AuthContainer: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
          localStorage.setItem(LocalStorageKeysEnum.TOKEN, r.token);
          localStorage.setItem(LocalStorageKeysEnum.ROLE, r.role);
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
            <TextField
              id="outlined-basic"
              label="Логин"
              size={'small'}
              variant="outlined"
              fullWidth
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Пароль"
              size={'small'}
              type={'password'}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button variant="contained" onClick={enterInApp}>
              Вход
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthContainer;
