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
import { startOfMonth, getDaysInMonth, getMonth } from 'date-fns';

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
      const findHistory: any[] = [];
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
            date_completed: new Date(sale.date_completed),
            type: 'Пользовательский',
          };
        });
      const salesWithDatesUnauthorized = sales.items
        .filter((itm) => itm.type === 'unauthorized')
        .map((sale) => {
          return {
            ...sale,
            date_completed: new Date(sale.date_completed),
            type: 'Незарегистрированный',
          };
        });
      console.log(salesWithDatesCustom, salesWithDatesUnauthorized);
      for (let i = 0; i <= datesCount; i++) {
        datesArrCustom.push(new Date(yaer, month, i + 1));
        datesArrUnauthorized.push(new Date(yaer, month, i + 1));
      }
      const result = [
        ...datesArrCustom.map((dateArr) => {
          if (
            salesWithDatesCustom.filter(
              (itm) => itm.date_completed.getTime() === dateArr.getTime(),
            ).length > 0
          ) {
            const newObj = salesWithDatesCustom.filter(
              (itm) => itm.date_completed.getTime() === dateArr.getTime(),
            );
            if (newObj.length > 1) {
              findHistory.push(...newObj.flat());
              return {
                date_completed: dateArr,
                id: null,
                allPrice: 0,
                constPrice: 0,
                name: 'Заказ отсутствует',
                type: 'Пользовательский',
              };
            } else {
              return { ...newObj[0] };
            }
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
            salesWithDatesUnauthorized.filter(
              (itm) => itm.date_completed.getTime() === dateArr.getTime(),
            ).length > 0
          ) {
            const newObj = salesWithDatesUnauthorized.filter(
              (itm) => itm.date_completed.getTime() === dateArr.getTime(),
            );
            if (newObj.length > 1) {
              findHistory.push(...newObj.flat());
              return {
                date_completed: dateArr,
                id: null,
                allPrice: 0,
                constPrice: 0,
                name: 'Заказ отсутствует',
                type: 'Пользовательский',
              };
            } else {
              return { ...newObj[0] };
            }
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
      const resArr: any[] = [];
      findHistory
        .map((item, index, arr) => {
          if (
            arr.filter(
              (el) =>
                el.name === item.name &&
                el.date_completed.getTime() === item.date_completed.getTime(),
            ).length > 1
          ) {
            const filteredArr = arr.filter(
              (el) =>
                el.name === item.name &&
                el.date_completed.getTime() === item.date_completed.getTime(),
            );
            return {
              ...item,
              allPrice: filteredArr.reduce(
                (accum, elem) => accum + elem.allPrice,
                0,
              ),
              constPrice: filteredArr.reduce(
                (accum, elem) => accum + elem.constPrice,
                0,
              ),
            };
          } else return { ...item };
        })
        .forEach(function (item) {
          const i: any = resArr.findIndex((x) => x.name == item.name);
          if (i <= -1) {
            resArr.unshift({ ...item });
          }
        });
      const returnedElement = [...resArr, ...result];

      return returnedElement
        .sort((a, b) => {
          return (
            new Date(a.date_completed).getTime() -
            new Date(b.date_completed).getTime()
          );
        })
        .map((itm) => {
          return {
            ...itm,
            date_completed: itm.date_completed.toLocaleDateString(),
          };
        });
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
        items={
          sales
            ? sales.items.map((item) => {
                return {
                  ...item,
                  date_completed: new Date(
                    item.date_completed,
                  ).toLocaleDateString(),
                  type:
                    item.type === 'custom'
                      ? 'Пользовательский'
                      : 'Незарегистрированный',
                };
              })
            : []
        }
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
