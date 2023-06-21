import React from 'react';
import cn from 'classnames/bind';
import styles from './styles.styl';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoutesEnum, PublicRoutesEnum } from 'src/router';
import {
  Header as ConstaHeader,
  HeaderMenu,
  HeaderModule,
} from '@consta/uikit/Header';
import { HeaderIdEnum, LocalStorageKeysEnum } from 'src/utils/enum';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectIsAuth } from 'src/redux/features/auth/selectors';
import BasketWithCount from 'src/components/BasketWithCount/BasketWithCount';
import { Button } from '@consta/uikit/Button';
import { User } from '@consta/uikit/User';
import AuthService from 'src/api/requests/userAPI';

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
  const myLoc = `/${location.pathname.split('/').slice(1, 2).join('')}`;
  const items: Item[] = [
    {
      label: 'Главная',
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
      label: 'Аналитика',
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
      label: 'Календарь',
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
      label: 'Обработка заказов',
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
      label: 'История заказов',
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
      label: 'Рецепты',
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
      label: 'Отзывы',
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
      label: 'Справочники',
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
    console.log(myLoc === patch, myLoc, patch);
    e.preventDefault();
    navigate(patch);
  };
  const logoutApp = async () => {
    AuthService.logout().then(() => {
      localStorage.clear();
      dispatch(setIsAuth(false));
      navigate(PublicRoutesEnum.LOGIN);
    });
  };
  return (
    <ConstaHeader
      className={cx(styles.Header, {
        not:
          myLoc === PublicRoutesEnum.AUTH || myLoc === PublicRoutesEnum.LOGIN,
      })}
      leftSide={
        <HeaderModule>
          <nav className={styles.Header__nav}>
            <HeaderMenu items={isAuth ? items : []} />
          </nav>
        </HeaderModule>
      }
      rightSide={
        <div className={styles.Header__user}>
          {isAuth && <User name={user} size={'l'} info={phone} />}
          <BasketWithCount />{' '}
          {isAuth ? (
            <div className={styles.Header__user}>
              <Button
                onClick={logoutApp}
                size={'s'}
                view={'primary'}
                label={'Выйти'}
              />
            </div>
          ) : (
            <div className={styles.buttons}>
              <Button
                onClick={() => navigate(PublicRoutesEnum.LOGIN)}
                label={'Вход'}
                size={'s'}
              />
              <Button
                onClick={() => navigate(PublicRoutesEnum.AUTH)}
                label={'Регистрация'}
                size={'s'}
              />
            </div>
          )}
        </div>
      }
    ></ConstaHeader>
  );
};

export default Header;
