import React, { useEffect, useRef, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './ShopPage.styl';
import ShopPageItem from 'src/pages/ShopPage/ShopPageItem/ShopPageItem';
import { IconDown } from '@consta/uikit/IconDown';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import ShopCaroucel from 'src/pages/ShopPage/ShopCaroucel/ShopCaroucel';
import ShopFillingItem from 'src/pages/ShopPage/ShopFillingItem/ShopFillingItem';

const ShopPage: React.FC = () => {
  const shopRef = useRef<HTMLDivElement>(null);
  const [fillings, setFillings] = useState([]);
  const [items, setItems] = useState<DeviceListModel[]>([]);
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

  const { load: fetchFillings, isLoading: fillingLoading } = useRequest(
    cakesApi.getCakeFillings,
    (data) => {
      if (data) {
        setFillings(data.data);
      }
    },
  );

  const handleScrollToAnElement = () => {
    shopRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchRecipes();
    fetchFillings();
  }, []);

  return (
    <section className={styles.Shop}>
      <div className={styles.Shop__title}>
        <div className={styles.Shop__titleCase}>
          <div className={styles.Shop__titleCase__text}>
            <Text
              size={'6xl'}
              weight={'semibold'}
              className={styles.Shop__title__text}
            >
              AlexaCake Store
            </Text>
            <Text
              size={'4xl'}
              view={'primary'}
              weight={'semibold'}
              className={styles.Shop__subTitle}
            >
              Авторский торт и десерты для Вашего праздника
            </Text>
            <Text size={'l'}>Выполним заказ любой сложности и дизайна</Text>
          </div>

          <ShopCaroucel items={items} automatic />
        </div>

        <div className={styles.Shop__title__actions}>
          <Button
            onClick={() => {
              handleScrollToAnElement();
            }}
            iconLeft={IconDown}
            label={'Выбрать десерт'}
          />
          <Button label={'Заказать индивидуальный десерт'} />
        </div>
      </div>
      <div className={styles.Shop__case}>
        <Text size={'3xl'} weight={'semibold'}>
          Воплощаем Ваши желания
        </Text>
        <Text size={'xl'}>
          Здесь рождаются торты, которые радуют своих получателей и гостей на
          мероприятиях яркостью и художественным оформлением,с помощью кремовой
          росписи, мастики, ганаша и изомальта.
        </Text>
      </div>
      <div className={styles.Shop__case}>
        <Text size={'3xl'}>
          {fillings.length} различных вкусов для начинки :
        </Text>
        <div className={styles.Shop__case__fillings}>
          {fillings.map((itm, idx) => (
            <div key={idx}>
              <ShopFillingItem
                item={itm}
                className={styles.Shop__items__item}
              />
            </div>
          ))}
        </div>
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
