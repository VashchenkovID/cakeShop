import React, { useEffect, useState } from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import styles from './MainPage.styl';
import { Text } from '@consta/uikit/Text';
import ShopCaroucel from 'src/pages/ShopPage/ShopCaroucel/ShopCaroucel';
import { Button } from '@consta/uikit/Button';
import ShopFillingItem from 'src/pages/ShopPage/ShopFillingItem/ShopFillingItem';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
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
              navigate(`${PublicRoutesEnum.SHOP}`);
            }}
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
    </section>
  );
};

export default MainPage;
