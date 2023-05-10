import React, { useEffect, useMemo, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './ShopPage.styl';
import cn from 'classnames/bind';
import ShopPageItem from 'src/pages/ShopPage/ShopPageItem/ShopPageItem';
import { Text } from '@consta/uikit/Text';
import { TypeModel } from 'src/api/models/TypeModel';
import { Loader } from '@consta/uikit/Loader';
import PaginationCustom, {
  PaginationStateType,
} from 'src/components/PaginationCustom/PaginationCustom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import IconBasket from 'src/components/IconBasket/IconBasket';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

const cx = cn.bind(styles);

const ShopPage: React.FC = () => {
  const basket = useAppSelector(selectBasket);
  const navigate = useNavigate();
  const [types, setTypes] = useState<TypeModel[]>([
    {
      id: undefined,
      name: 'Все',
      createdAt: '',
      updatedAt: '',
    },
  ]);
  const [type, setType] = useState<TypeModel | undefined>({
    id: undefined,
    name: 'Все',
    createdAt: '',
    updatedAt: '',
  });
  const [items, setItems] = useState<DeviceListModel[]>([]);
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    perPage: 10,
  });
  const [count, setCount] = useState(0);
  const { load: fetchRecipes, isLoading } = useRequest(
    cakesApi.loadAllCakes,
    (data) => {
      if (data) {
        setItems(data.data.rows);
        setCount(data.data.count);
      }
    },
  );
  const { load: fetchTypes, isLoading: typeLoading } = useRequest(
    cakesApi.getCakeTypes,
    (data) => {
      if (data) {
        setTypes((prev) => {
          return [...prev, ...data.data];
        });
      }
    },
  );

  const isBasketVisible = useMemo(() => {
    return basket && basket.items.length > 0;
  }, [basket]);

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    if (type) {
      fetchRecipes({
        typeId: type.id,
        page: pagination.page,
        limit: pagination.perPage,
      });
    } else {
      fetchRecipes({
        typeId: undefined,
        page: pagination.page,
        limit: pagination.perPage,
      });
    }
  }, [pagination, type]);
  return (
    <section className={styles.Shop}>
      <Text size={'3xl'}>Каталог десертов</Text>
      <div className={styles.Shop__header}>
        {types.map((t, index) => (
          <Text
            className={cx(styles.Shop__header__type, {
              active: type && type.id === t.id,
            })}
            onClick={() => setType(t)}
            key={index}
          >
            {t.name}
          </Text>
        ))}
      </div>
      <div className={styles.Shop__items}>
        {isLoading && <Loader />}
        {!isLoading &&
          items &&
          items.length > 0 &&
          items.map((item, index) => (
            <ShopPageItem item={item} key={index} activeItem={null} />
          ))}
      </div>

      <div
        className={cx(styles.IconBasket, {
          visible: isBasketVisible,
        })}
        onClick={() => navigate(`${PublicRoutesEnum.VIEW_ORDER}`)}
      >
        <IconBasket className={styles.IconBasket__icon} />
      </div>

      <footer className={styles.Shop__active}>
        <PaginationCustom
          total={count}
          pagination={pagination}
          setPagination={setPagination}
        />
      </footer>
    </section>
  );
};

export default ShopPage;
