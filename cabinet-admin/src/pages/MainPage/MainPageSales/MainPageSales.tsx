import React, { useEffect, useMemo, useState } from 'react';
import { AnalyticsSalesModel } from 'src/api/models/AnalyticsSalesModel';
import useRequest from 'src/hooks/useRequest';
import analyticsApi from 'src/api/requests/analyticsApi';
import { Loader } from '@consta/uikit/Loader';
import styles from './MainPageSales.module.styl';
import { Text } from '@consta/uikit/Text';

const MainPageSales: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [sales, setSales] = useState<AnalyticsSalesModel | null>(null);

  const { load: fetchSalesForMonth, isLoading: isSalesLoading } = useRequest(
    analyticsApi.getSales,
    (data) => {
      if (data) {
        setSales(data.data);
      }
    },
  );
  const statistic = useMemo(() => {
    if (sales) {
      return [
        { id: 0, title: 'Прибыль', value: sales.earned?.toFixed(2), color: '#51dd00' },
        { id: 1, title: 'Расходы', value: sales.spent?.toFixed(2), color: '#fa2e00' },
        {
          id: 2,
          title: 'Чистая прибыль',
          value: sales.profit?.toFixed(2),
          color: sales.profit < 0 ? '#fa2e00' : '#51dd00',
        },
      ];
    } else return [];
  }, [sales]);
  useEffect(() => {
    fetchSalesForMonth(date.toISOString());
  }, [date]);
  return (
    <>
      {isSalesLoading ? (
        <Loader />
      ) : (
        <div className={styles.Analytics__badges}>
          {statistic.map((itm, idx) => (
            <div className={styles.Analytics__badges__badge} key={idx}>
              <Text style={{ color: itm.color }} size={'l'}>
                {itm.title}
              </Text>
              <Text style={{ color: itm.color }} size={'2xl'}>
                {itm.value} ₽
              </Text>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MainPageSales;
