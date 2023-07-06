import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import analyticsApi from 'src/api/requests/analyticsApi';
import { Text } from '@consta/uikit/Text';
import { AnalyticsPopularsModel } from 'src/api/models/AnalyticsPopularsModel';
import { IconArrowUp } from '@consta/uikit/IconArrowUp';
import styles from './AdministrationAnalyticsPopulars.styl';
import { Loader } from '@consta/uikit/Loader';

interface IComponentProps {
  date: Date;
}

const AdministrationAnalyticsPopulars: React.FC<IComponentProps> = ({
  date,
}) => {
  const [populars, setPopulars] = useState<AnalyticsPopularsModel[]>([]);

  const { load: fetchPopulars, isLoading } = useRequest(
    analyticsApi.getOrderProcessing,
    (data) => {
      setPopulars(data.data.items);
    },
  );
  useEffect(() => {
    fetchPopulars(date.toISOString());
  }, [date]);

  return (
    <div className={styles.Popular}>
      <Text size={'3xl'}>Рейтинг десертов за месяц</Text>
      <div className={styles.Popular__rows__row}>
        <Text weight={'semibold'}>Наименование</Text>
        <Text weight={'semibold'}>Прибыль</Text>
        <Text weight={'semibold'}>Куплено за месяц</Text>
      </div>
      {!isLoading && populars.length > 0 && (
        <div className={styles.Popular__rows}>
          {populars
            .sort((a, b) => b.count - a.count)
            .map((item, index) => (
              <div className={styles.Popular__rows__row} key={index}>
                <Text
                  weight={'semibold'}
                  className={styles.Popular__rowPopular}
                  style={{ color: item.popularity ? '#51dd00' : '' }}
                >
                  {item.name}
                  {item.popularity ? (
                    <IconArrowUp
                      className={styles.Popular__rowPopular__color}
                    />
                  ) : null}
                </Text>
                <Text>{item.price} ₽</Text>
                <Text>{item.count} шт</Text>
              </div>
            ))}
        </div>
      )}
      {isLoading && <Loader />}
      {populars.length === 0 && (
        <Text align={'center'}>Данные отсутствуют</Text>
      )}
    </div>
  );
};

export default AdministrationAnalyticsPopulars;
