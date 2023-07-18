import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Auth.module.styl";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import PhoneInput from "react-phone-input-2";
import { Button } from "@consta/uikit/Button";
import { LocalStorageKeysEnum, PublicRoutesEnum } from "src/utils/enum";
import AuthService from "../../api/requests/userAPI";
import { setIsAuth } from "src/store/features/auth/AuthSlice";
import { useAppDispatch } from "src/hooks/useAppDispatch";

const AuthContainer: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const clearInputs = () => {
    setLogin("");
    setPassword("");
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
          localStorage.setItem(
            LocalStorageKeysEnum.USER,
            JSON.stringify(r.data.user)
          );
          clearInputs();
          setLoading(false);
          navigate(PublicRoutesEnum.SHOP);
        })
        .catch((r) => {
          // toast.error(r.response.data.message);
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
          localStorage.setItem(
            LocalStorageKeysEnum.USER,
            JSON.stringify(r.data.user)
          );
          clearInputs();
          navigate(PublicRoutesEnum.SHOP);
          setLoading(false);
        })
        .catch((r) => {
          // toast.error(r.response.data.message);
          setLoading(false);
        });
    }
    setLoading(false);
  };

  const disabled = useMemo(() => {
    if (location.pathname.includes(PublicRoutesEnum.AUTH)) {
      return (
        login === "" ||
        password === "" ||
        name === "" ||
        phone === "" ||
        !login ||
        !password ||
        !name ||
        !phone
      );
    } else return login === "" || password === "" || !login || !password;
  }, [location.pathname, login, name, password, phone]);

  return (
    <>
      <div className={style.Container}>
        <div className={style.Container__body}>
          <Text size={"3xl"} className={style.Container__title}>
            {location.pathname.includes(PublicRoutesEnum.AUTH)
              ? "Регистрация"
              : "Авторизация"}
          </Text>
          <TextField
            size={"s"}
            label={"Логин"}
            placeholder={"Логин"}
            width={"full"}
            id="outlined-basic"
            value={login}
            onChange={({ value }) => {
              if (value) {
                setLogin(value);
              } else setLogin("");
            }}
          />
          <TextField
            type={"password"}
            placeholder={"Пароль"}
            label={"Пароль"}
            size={"s"}
            width={"full"}
            id="outlined-basic"
            value={password}
            onChange={({ value }) => {
              if (value) {
                setPassword(value);
              } else setPassword("");
            }}
          />
          {location.pathname.includes(PublicRoutesEnum.AUTH) && (
            <TextField
              size={"s"}
              width={"full"}
              placeholder={"Введите имя"}
              label={"Имя"}
              value={name}
              onChange={({ value }) => {
                if (value) {
                  setName(value);
                } else setName("");
              }}
            />
          )}
          {location.pathname.includes(PublicRoutesEnum.AUTH) && (
            <PhoneInput
              specialLabel={"Номер телефона"}
              containerClass={style.Container__phoneContainer}
              inputClass={style.Container__phoneInput}
              placeholder={"Введите номер телефона"}
              country={"ru"}
              value={phone}
              onChange={(value) =>
                setPhone(
                  value
                    .split("")
                    .map((elem, index) => (index === 0 ? "7" : elem))
                    .join("")
                )
              }
            />
          )}
          {location.pathname.includes(PublicRoutesEnum.LOGIN) ? (
            <Text
              size={"s"}
              onClick={() => {
                navigate(PublicRoutesEnum.AUTH);
              }}
            >
              Еще не зарегистрированы?{" "}
              <span className={style.Container__span}>Регистрация</span>
            </Text>
          ) : (
            <Text
              size={"s"}
              onClick={() => {
                navigate(PublicRoutesEnum.LOGIN);
              }}
            >
              Уже зарегистрированы?{" "}
              <span className={style.Container__span}>Войти</span>
            </Text>
          )}

          <Button
            size={"s"}
            width={"full"}
            onClick={enterInApp}
            label={"Вход"}
            view={disabled ? "ghost" : "primary"}
            disabled={disabled}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
