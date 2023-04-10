import React from 'react';
import cn from 'classnames/bind';
import styles from './styles.styl';
import { useLocation, useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

import { HeaderIdEnum, LocalStorageKeysEnum } from 'src/utils/enum';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectIsAuth } from 'src/redux/features/auth/selectors';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

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
  const isAuth = useAppSelector(selectIsAuth);
  const myLoc = `/${location.pathname.split('/').slice(1, 2).join('')}`;
  const role = localStorage.getItem(LocalStorageKeysEnum.ROLE);

  const items: Item[] = [
    {
      label: 'Магазин',
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
      label: 'Администрирование',
      id: HeaderIdEnum.ADMINISTRATION,
      href: PublicRoutesEnum.ADMINISTRATION,
      active: myLoc === PublicRoutesEnum.ADMINISTRATION,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.ADMINISTRATION);
      },
      permission: [],
      access: true,
    },
  ];

  const headerTransition = (e: React.MouseEvent, patch: string) => {
    e.preventDefault();
    navigate(patch);
  };

  return (
    <header
      className={cx(styles.Header, {
        not:
          myLoc === PublicRoutesEnum.AUTH || myLoc === PublicRoutesEnum.LOGIN,
      })}
    >
      <nav className={styles.Header__nav}>
        {role && role === 'ADMIN'
          ? items.map((itm, idx) => (
              <li
                className={cx(styles.Header__li, {
                  active: itm.active,
                })}
                onClick={itm.onClick}
                key={idx}
              >
                {itm.label}
              </li>
            ))
          : items
              .filter((itm) => !itm.access)
              .map((itm, idx) => (
                <li
                  className={cx(styles.Header__li, {
                    active: itm.active,
                  })}
                  onClick={itm.onClick}
                  key={idx}
                >
                  {itm.label}
                </li>
              ))}
      </nav>
      {isAuth ? (
        <div className={styles.Header__user}>
          <UserOutlined />
          {user}
          <ShoppingCartOutlined />
          <Button
            onClick={() => {
              localStorage.clear();
              dispatch(setIsAuth(false));
            }}
          >
            Выйти
          </Button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate(PublicRoutesEnum.LOGIN)}>Вход</button>
          <button onClick={() => navigate(PublicRoutesEnum.AUTH)}>
            Регистрация
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
