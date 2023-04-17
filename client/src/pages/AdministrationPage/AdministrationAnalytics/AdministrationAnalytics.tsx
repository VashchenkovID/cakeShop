import React, { useEffect, useMemo, useState } from 'react';
import analyticsApi from 'src/api/requests/analyticsApi';
import useRequest from 'src/hooks/useRequest';
import { AnalyticsSalesModel } from 'src/api/models/AnalyticsSalesModel';
import AdministrationAnalyticsSalesGraph from 'src/pages/AdministrationPage/AdministrationAnalyticsSalesGraph/AdministrationAnalyticsSalesGraph';
import styles from './AdministrationAnalytics.styl';
import AdministrationAnalyticsPopulars from 'src/pages/AdministrationPage/AdministrationAnalyticsPopulars/AdministrationAnalyticsPopulars';
import { Text } from '@consta/uikit/Text';
import AdministrationAnalyticsDateChange from 'src/pages/AdministrationPage/AdministrationAnalyticsDateChange/AdministrationAnalyticsDateChange';
import { Loader } from '@consta/uikit/Loader';
import { startOfMonth, getDaysInMonth, getMonth, add } from 'date-fns';

const AdministrationAnalytics: React.FC = () => {
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

  useEffect(() => {
    fetchSalesForMonth(date.toISOString());
  }, [date]);

  const lineGraphData = useMemo(() => {
    if (sales) {
      const startDate = startOfMonth(date);
      const datesCount = getDaysInMonth(startDate);
      const month = getMonth(date);
      const yaer = date.getFullYear();
      const datesArrCustom = [];
      const datesArrUnauthorized = [];
      const salesWithDatesCustom = sales.items
        .filter((itm) => itm.type === 'custom')
        .map((sale) => {
          return {
            ...sale,
            date_completed: new Date(sale.date_completed).toLocaleDateString(),
            type: 'Пользовательский',
          };
        });
      const salesWithDatesUnauthorized = sales.items
        .filter((itm) => itm.type === 'unauthorized')
        .map((sale) => {
          return {
            ...sale,
            date_completed: new Date(sale.date_completed).toLocaleDateString(),
            type: 'Незарегистрированный',
          };
        });

      for (let i = 0; i <= datesCount; i++) {
        datesArrCustom.push(new Date(yaer, month, i + 1).toLocaleDateString());
        datesArrUnauthorized.push(
          new Date(yaer, month, i + 1).toLocaleDateString(),
        );
      }
      return [
        ...datesArrCustom.map((dateArr) => {
          if (
            salesWithDatesCustom.find((itm) => itm.date_completed === dateArr)
          ) {
            const newObj = salesWithDatesCustom.find(
              (itm) => itm.date_completed === dateArr,
            );
            return { ...newObj };
          } else
            return {
              date_completed: dateArr,
              id: null,
              allPrice: 0,
              constPrice: 0,
              name: 'Заказ отсутствует',
              type: 'Пользовательский',
            };
        }),
        ...datesArrUnauthorized.map((dateArr) => {
          if (
            salesWithDatesUnauthorized.find(
              (itm) => itm.date_completed === dateArr,
            )
          ) {
            const newObj = salesWithDatesUnauthorized.find(
              (itm) => itm.date_completed === dateArr,
            );
            return { ...newObj };
          } else
            return {
              date_completed: dateArr,
              id: null,
              allPrice: 0,
              constPrice: 0,
              name: 'Заказ отсутствует',
              type: 'Незарегистрированный',
            };
        }),
      ];
    } else return [];
  }, [sales, date]);

  const statistic = useMemo(() => {
    if (sales) {
      return [
        { id: 0, title: 'Прибыль', value: sales.earned, color: '#51dd00' },
        { id: 1, title: 'Расходы', value: sales.spent, color: '#fa2e00' },
        {
          id: 2,
          title: 'Чистая прибыль',
          value: sales.profit,
          color: sales.profit < 0 ? '#fa2e00' : '#51dd00',
        },
      ];
    } else return [];
  }, [sales]);
  return (
    <div className={styles.Analytics}>
      <AdministrationAnalyticsSalesGraph
        lineGraphData={lineGraphData}
        isLoading={isSalesLoading}
      />
      <div className={styles.rightSide}>
        <AdministrationAnalyticsDateChange date={date} setDate={setDate} />
        {isSalesLoading ? (
          <Loader />
        ) : (
          <div className={styles.Analytics__badges}>
            {statistic.map((itm, idx) => (
              <div className={styles.Analytics__badges__badge} key={idx}>
                <Text style={{ color: itm.color }} size={'2xl'}>
                  {itm.title}
                </Text>
                <Text style={{ color: itm.color }} size={'3xl'}>
                  {itm.value},00 ₽
                </Text>
              </div>
            ))}
          </div>
        )}

        <AdministrationAnalyticsPopulars date={date} />
      </div>
    </div>
  );
};

export default AdministrationAnalytics;
