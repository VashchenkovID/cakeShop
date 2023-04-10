import React, { useEffect, useRef, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import { Button } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import styles from './ShopPage.styl';
import ShopPageItem from 'src/pages/ShopPage/ShopPageItem/ShopPageItem';

const ShopPage: React.FC = () => {
  const shopRef = useRef<HTMLDivElement>(null);
  const [fillings, setFillings] = useState([]);
  const [items, setItems] = useState<DeviceListModel[]>([]);
  const [type, setType] = useState(null);
  const [count, setCount] = useState<number>(0);

  const { load: fetchRecipes, isLoading } = useRequest(
    cakesApi.loadAllCakes,
    (data) => {
      if (data) {
        setItems(data.data.rows);
        setCount(data.data.count);
      }
    },
  );

  const handleScrollToAnElement = () => {
    shopRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <section className={styles.Shop}>
      <div className={styles.Shop__title}>
        <h1 className={styles.Shop__title__text}>Торты и капкейки</h1>
        <p className={styles.Shop__title__subTitle}>
          Готовим и оформляем десерты на дни рождения, годовщины, корпоративы
        </p>
        <div className={styles.Shop__title__actions}>
          <Button
            onClick={() => {
              handleScrollToAnElement();
            }}
          >
            Выбрать десерт <ArrowDownOutlined />
          </Button>
          <Button>Заказать индивидуальный десерт</Button>
        </div>
      </div>
      <div className={styles.Shop__case}>
        <h2>Воплощаем Ваши желания</h2>
        <p>
          Здесь рождаются торты, которые радуют своих получателей и гостей на
          мероприятиях яркостью и художественным оформлением,с помощью кремовой
          росписи, мастики, ганаша и изомальта.
        </p>
      </div>
      <div className={styles.Shop__case}>
        {fillings.length} различных вкусов для начинки :
      </div>
      <div ref={shopRef}>
        <h2>Наши десерты:</h2>
        <div className={styles.Shop__items}>
          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <ShopPageItem item={item} key={index} activeItem={null} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
