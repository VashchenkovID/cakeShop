import React, { useMemo, useState } from "react";
import cn from "classnames/bind";
import styles from "./Header.module.styl";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import {
  Header as ConstaHeader,
  HeaderMenu,
  HeaderModule,
} from "@consta/uikit/Header";
import { Button } from "@consta/uikit/Button";
import { User } from "@consta/uikit/User";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  HeaderIdEnum,
  LocalStorageKeysEnum,
  PrivateRoutesEnum,
  PublicRoutesEnum,
} from "../../utils/enum";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectIsAuth } from "../../store/features/auth/selectors";
import AuthService from "../../api/requests/userAPI";
import { setIsAuth } from "../../store/features/auth/AuthSlice";
import BasketWithCount from "../BasketWithCount/BasketWithCount";
import { useResize } from "../../hooks/useResize";
import { Sidebar } from "@consta/uikit/Sidebar";
import { IconAlignJustify } from "@consta/uikit/IconAlignJustify";
import { IconClose } from "@consta/uikit/IconClose";
import { Text } from "@consta/uikit/Text";
import FooterWithInfo from "../FooterWithInfo/FooterWithInfo";
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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem(LocalStorageKeysEnum.NAME);
  const phone = localStorage.getItem(LocalStorageKeysEnum.PHONE);
  const isAuth = useAppSelector(selectIsAuth);
  const myLoc = `/${location.pathname.split("/").slice(1, 2).join("")}`;
  const role = localStorage.getItem(LocalStorageKeysEnum.ROLE);

  const [isOpen, setIsOpen] = useState(false);
  const { width } = useResize();

  const headerItems: Item[] = [
    {
      label: "Главная",
      id: HeaderIdEnum.GENERAL,
      href: PublicRoutesEnum.GENERAL,
      active: myLoc === PublicRoutesEnum.GENERAL,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.GENERAL);
      },
      permission: [],
      access: false,
    },
    {
      label: "Каталог",
      id: HeaderIdEnum.SHOP,
      href: PublicRoutesEnum.SHOP,
      active: myLoc === PublicRoutesEnum.SHOP,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.SHOP);
      },
      permission: [],
      access: false,
    },
    {
      label: "Начинки",
      id: HeaderIdEnum.FILLINGS,
      href: PublicRoutesEnum.FILLINGS,
      active: myLoc === PublicRoutesEnum.FILLINGS,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.FILLINGS);
      },
      permission: [],
      access: false,
    },
  ];
  const privateItems: Item[] = [
    {
      label: "Главная",
      id: HeaderIdEnum.GENERAL,
      href: PublicRoutesEnum.GENERAL,
      active: myLoc === PublicRoutesEnum.GENERAL,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.GENERAL);
      },
      permission: [],
      access: false,
    },
    {
      label: "Каталог",
      id: HeaderIdEnum.SHOP,
      href: PublicRoutesEnum.SHOP,
      active: myLoc === PublicRoutesEnum.SHOP,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.SHOP);
      },
      permission: [],
      access: false,
    },
    {
      label: "Начинки",
      id: HeaderIdEnum.FILLINGS,
      href: PublicRoutesEnum.FILLINGS,
      active: myLoc === PublicRoutesEnum.FILLINGS,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.FILLINGS);
      },
      permission: [],
      access: false,
    },
    {
      label: "Мои заказы",
      id: HeaderIdEnum.MY_ORDERS,
      href: PrivateRoutesEnum.MY_ORDERS,
      active: myLoc === PrivateRoutesEnum.MY_ORDERS,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.MY_ORDERS);
      },
      permission: [],
      access: false,
    },
    {
      label: "Мои отзывы",
      id: HeaderIdEnum.MY_FEEDBACK,
      href: PrivateRoutesEnum.MY_FEEDBACK,
      active: myLoc === PrivateRoutesEnum.MY_FEEDBACK,
      onClick: (e) => {
        headerTransition(e, PrivateRoutesEnum.MY_FEEDBACK);
      },
      permission: [],
      access: false,
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
      setIsOpen(false);
    });
  };
  return (
    <>
      <ConstaHeader
        className={cx(styles.Header, {
          not:
            myLoc === PublicRoutesEnum.AUTH || myLoc === PublicRoutesEnum.LOGIN,
        })}
        leftSide={
          width <= 850 ? (
            <div>
              {!isOpen && (
                <Button
                  iconLeft={isOpen ? IconClose : IconAlignJustify}
                  view={"clear"}
                  size={"l"}
                  onClick={() => setIsOpen(true)}
                />
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
                      {isAuth && (
                        <User name={user || ""} size={"l"} info={phone || ""} />
                      )}
                      <BasketWithCount />{" "}
                      <Button
                        iconLeft={isOpen ? IconClose : IconAlignJustify}
                        view={"clear"}
                        size={"l"}
                        onClick={() => setIsOpen(false)}
                      />
                    </div>
                  )}
                  <div className={styles.Sidebar__links}>
                    {isAuth
                      ? privateItems.map((item) => (
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
                        ))
                      : headerItems.map((item) => (
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
                          size={"s"}
                        />
                        <Button
                          onClick={() => {
                            setIsOpen(false);
                            navigate(PublicRoutesEnum.AUTH);
                          }}
                          label={"Регистрация"}
                          size={"s"}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.Sidebar__footer}>
                  <FooterWithInfo />
                </div>
              </Sidebar>
            </div>
          ) : (
            <HeaderModule className={styles.Header__left}>
              <img className={styles.Logo} src={logo} />
              <nav className={styles.Header__nav}>
                {isAuth && <HeaderMenu items={privateItems} />}
                {!isAuth && <HeaderMenu items={headerItems} />}
              </nav>
            </HeaderModule>
          )
        }
        rightSide={
          width >= 500 ? (
            <div className={styles.Header__user}>
              {isAuth && (
                <User name={user || ""} size={"l"} info={phone || ""} />
              )}
              <BasketWithCount />{" "}
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
          ) : (
            <img className={styles.Logo} src={logo} />
          )
        }
      ></ConstaHeader>
    </>
  );
};

export default Header;
