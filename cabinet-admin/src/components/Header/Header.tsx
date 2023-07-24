import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./styles.module.styl";
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutesEnum, PublicRoutesEnum } from "src/router";
import {
  Header as ConstaHeader,
  HeaderMenu,
  HeaderModule,
} from "@consta/uikit/Header";
import { HeaderIdEnum, LocalStorageKeysEnum } from "src/utils/enum";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { setIsAuth } from "src/redux/features/auth/AuthSlice";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectIsAuth } from "src/redux/features/auth/selectors";
import { Button } from "@consta/uikit/Button";
import { User } from "@consta/uikit/User";
import AuthService from "src/api/requests/userAPI";
import { Text } from "@consta/uikit/Text";
import { useResize } from "src/hooks/useResize";
import { IconAlignJustify } from "@consta/uikit/IconAlignJustify";
import { IconClose } from "@consta/uikit/IconClose";
import { Sidebar } from "@consta/uikit/Sidebar";

const cx = cn.bind(styles);

interface Item {
  label: string;
  id: string;
  href?: string;
  active?: boolean;
  onClick?: React.EventHandler<React.MouseEvent>;
  target?: string;
  permission: number[];
  access: boolean;
}

export interface IHeaderProps {}
const Header: React.FC<IHeaderProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useResize();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem(LocalStorageKeysEnum.NAME);
  const phone = localStorage.getItem(LocalStorageKeysEnum.PHONE);
  const isAuth = useAppSelector(selectIsAuth);
  const myLoc = `/${location.pathname.split("/").slice(1, 2).join("")}`;
  const items: Item[] = [
    {
      label: "Главная",
      id: HeaderIdEnum.ADMINISTRATION,
      href: PrivateRoutesEnum.ADMINISTRATION,
      active: myLoc === PrivateRoutesEnum.ADMINISTRATION,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.ADMINISTRATION);
      },
      permission: [],
      access: true,
    },
    {
      label: "Аналитика",
      id: HeaderIdEnum.ANALYTICS,
      href: PrivateRoutesEnum.ANALYTICS,
      active: myLoc === PrivateRoutesEnum.ANALYTICS,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.ANALYTICS);
      },
      permission: [],
      access: true,
    },
    {
      label: "Календарь",
      id: HeaderIdEnum.CALENDAR,
      href: PrivateRoutesEnum.CALENDAR,
      active: myLoc === PrivateRoutesEnum.CALENDAR,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.CALENDAR);
      },
      permission: [],
      access: true,
    },
    {
      label: "Обработка заказов",
      id: HeaderIdEnum.ORDERS,
      href: PrivateRoutesEnum.ORDERS,
      active: myLoc === PrivateRoutesEnum.ORDERS,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.ORDERS);
      },
      permission: [],
      access: true,
    },
    {
      label: "История заказов",
      id: HeaderIdEnum.ORDERS_HISTORY,
      href: PrivateRoutesEnum.ORDERS_HISTORY,
      active: myLoc === PrivateRoutesEnum.ORDERS_HISTORY,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.ORDERS_HISTORY);
      },
      permission: [],
      access: true,
    },
    {
      label: "Рецепты",
      id: HeaderIdEnum.RECIPES,
      href: PrivateRoutesEnum.RECIPES,
      active: myLoc === PrivateRoutesEnum.RECIPES,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.RECIPES);
      },
      permission: [],
      access: true,
    },
    {
      label: "Расчет рецепта",
      id: HeaderIdEnum.CALCULATE,
      href: PrivateRoutesEnum.CALCULATE,
      active: myLoc === PrivateRoutesEnum.CALCULATE,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.CALCULATE);
      },
      permission: [],
      access: true,
    },
    {
      label: "Отзывы",
      id: HeaderIdEnum.FEEDBACK,
      href: PrivateRoutesEnum.FEEDBACK,
      active: myLoc === PrivateRoutesEnum.FEEDBACK,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.FEEDBACK);
      },
      permission: [],
      access: true,
    },
    {
      label: "Справочники",
      id: HeaderIdEnum.TYPES,
      href: PrivateRoutesEnum.TYPES,
      active: myLoc === PrivateRoutesEnum.TYPES,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.TYPES);
      },
      permission: [],
      access: true,
    },
  ];
  const headerTransition = (e: React.MouseEvent, patch: string) => {
    e.preventDefault();
    navigate(patch);
  };
  const logoutApp = async () => {
    AuthService.logout().then(() => {
      localStorage.clear();
      dispatch(setIsAuth(false));
      navigate(PublicRoutesEnum.LOGIN);
    });
    setIsOpen(false);
  };
  return (
    <>
      {width >= 800 ? (
        <ConstaHeader
          className={cx(styles.Header, {
            not:
              myLoc === PublicRoutesEnum.AUTH ||
              myLoc === PublicRoutesEnum.LOGIN,
          })}
          leftSide={
            <HeaderModule>
              <div className={styles.Header__left}>
                <Text>Kassandra's Cake</Text>
                <nav className={styles.Header__nav}>
                  <HeaderMenu items={isAuth ? items : []} />
                </nav>
              </div>
            </HeaderModule>
          }
          rightSide={
            <div className={styles.Header__user}>
              {isAuth && (
                <User name={user || ""} size={"l"} info={phone || ""} />
              )}
              {isAuth ? (
                <div className={styles.Header__user}>
                  <Button
                    onClick={logoutApp}
                    size={"s"}
                    view={"primary"}
                    label={"Выйти"}
                  />
                </div>
              ) : (
                <div className={styles.buttons}>
                  <Button
                    onClick={() => navigate(PublicRoutesEnum.LOGIN)}
                    label={"Вход"}
                    size={"s"}
                  />
                  <Button
                    onClick={() => navigate(PublicRoutesEnum.AUTH)}
                    label={"Регистрация"}
                    size={"s"}
                  />
                </div>
              )}
            </div>
          }
        ></ConstaHeader>
      ) : (
        <div>
          {!isOpen && (
            <div className={styles.mobileLogo}>
              {location.pathname !== PublicRoutesEnum.LOGIN &&
                location.pathname !== PublicRoutesEnum.AUTH && (
                  <Button
                    iconLeft={isOpen ? IconClose : IconAlignJustify}
                    view={"primary"}
                    size={"l"}
                    className={styles.Header__burger}
                    onClick={() => setIsOpen(true)}
                  />
                )}

              <Text
                size={"l"}
                className={styles.logoText}
                onClick={() => navigate(PrivateRoutesEnum.ADMINISTRATION)}
              >
                Kassandra's cake
              </Text>
            </div>
          )}

          <Sidebar
            style={{ width: width - 30 }}
            className={styles.Sidebar}
            isOpen={isOpen}
            position={"left"}
            onClickOutside={() => setIsOpen(false)}
          >
            <div>
              {width < 800 && (
                <div className={styles.Sidebar__user}>
                  {isAuth ? (
                    <Text size={"l"}>Добро пожаловать,{user || ""}</Text>
                  ) : (
                    <Text
                      size={"l"}
                      onClick={() => navigate(PrivateRoutesEnum.ADMINISTRATION)}
                    >
                      Kassandra's Cake
                    </Text>
                  )}
                  <Button
                    iconLeft={isOpen ? IconClose : IconAlignJustify}
                    view={"clear"}
                    size={"l"}
                    className={styles.Sidebar__closeBtn}
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              )}
              <div className={styles.Sidebar__links}>
                {isAuth &&
                  items.map((item) => (
                    <Text
                      className={cx(styles.Sidebar__link, {
                        active: item.active,
                      })}
                      key={item.id}
                      onClick={(e: any) => {
                        setIsOpen(false);
                        if (item.onClick) {
                          item.onClick(e);
                        }
                      }}
                    >
                      {item.label}
                    </Text>
                  ))}
                {isAuth ? (
                  <div className={styles.Header__user}>
                    <Button
                      onClick={logoutApp}
                      size={"s"}
                      view={"primary"}
                      label={"Выйти"}
                    />
                  </div>
                ) : (
                  <div className={styles.buttons}>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(PublicRoutesEnum.LOGIN);
                      }}
                      label={"Вход"}
                      view={"primary"}
                      size={"s"}
                    />
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(PublicRoutesEnum.AUTH);
                      }}
                      label={"Регистрация"}
                      view={"primary"}
                      size={"s"}
                    />
                  </div>
                )}
              </div>
            </div>
          </Sidebar>
        </div>
      )}
    </>
  );
};

export default Header;
