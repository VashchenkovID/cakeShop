import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./Header.module.styl";
import { useLocation, useNavigate } from "react-router-dom";
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
  const items: Item[] = [
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
      label: "Торт по индивидуальному заказу",
      id: HeaderIdEnum.INDIVIDUAL,
      href: PublicRoutesEnum.INDIVIDUAL,
      active: myLoc === PublicRoutesEnum.INDIVIDUAL,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.INDIVIDUAL);
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
              <Button
                iconLeft={isOpen ? IconClose : IconAlignJustify}
                view={"clear"}
                size={"l"}
                onClick={() => setIsOpen(true)}
              />
              <Sidebar
                style={{ background: "red" }}
                isOpen={isOpen}
                position={"left"}
                onClickOutside={() => setIsOpen(false)}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (item.onClick) {
                        item.onClick(e);
                      }
                    }}
                  >
                    {item.label}
                  </div>
                ))}
                {width < 500 && (
                  <div>
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
                )}
              </Sidebar>
            </div>
          ) : (
            <HeaderModule>
              <nav className={styles.Header__nav}>
                <HeaderMenu items={items} />
              </nav>
            </HeaderModule>
          )
        }
        rightSide={
          width >= 500 && (
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
          )
        }
      ></ConstaHeader>
    </>
  );
};

export default Header;
