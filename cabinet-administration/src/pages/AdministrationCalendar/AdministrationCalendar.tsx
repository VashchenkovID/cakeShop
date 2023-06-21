import React, { useEffect, useMemo, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import calendarApi from 'src/api/requests/calendarApi';
import { getMonthData } from 'src/pages/AdministrationCalendar/useAdministrationCalendar';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationCalendar.styl';
import cn from 'classnames/bind';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import { Button } from '@consta/uikit/Button';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { add, getMonth, sub } from 'date-fns';
import { rusMonths } from 'src/utils/constants';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import { Modal } from '@consta/uikit/Modal';
import AdministrationOrderModal from 'src/pages/AdministrationOrders/AdministrationOrderModal/AdministrationOrderModal';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
const weekDayNames = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const cx = cn.bind(styles);

const AdministrationCalendar: React.FC = () => {
  const [calendar, setCalendar] = useState<{ date: string; orders: any[] }[]>(
    [],
  );
  const [date, setDate] = useState(new Date());
  const { load: fetchCalendar } = useRequest(
    calendarApi.getCalendar,
    (data) => {
      if (data) {
        setCalendar(data.data);
      }
    },
  );
  const [activeOrder, setActiveOrder] = useState<OrderProcessingModel | null>(
    null,
  );
  const [modal, setModal] = useState(false);
  const month = useMemo(() => {
    return getMonth(date);
  }, [date]);
  useEffect(() => {
    fetchCalendar(date.toISOString());
  }, [date]);
  const datesCells = useMemo(() => {
    if (calendar && calendar.length > 0) {
      const monthData = getMonthData(date.getFullYear(), date.getMonth());
      return monthData.flat().map((d) => {
        if (d !== undefined) {
          const calendarItem = calendar.filter(
            (itm) =>
              new Date(itm.date).toLocaleDateString() ===
              new Date(d).toLocaleDateString(),
          );

          if (calendarItem.length > 0) {
            return { date: d, orders: calendarItem[0].orders };
          } else return { date: d, orders: [] };
        } else return undefined;
      });
    } else return [];
  }, [calendar]);
  return (
    <MainWrapper>
      <section className={styles.Calendar}>
        <div className={styles.Calendar__headerChange}>
          <Text size={'3xl'}>Календарь заказов</Text>
          <div className={styles.Calendar__actions}>
            <Button
              iconLeft={IconArrowLeft}
              form={'round'}
              onClick={() =>
                setDate((prevState) => {
                  return sub(prevState, { months: 1 });
                })
              }
            />
            <Text size={'2xl'}>{date ? rusMonths[month] : null}</Text>
            <Button
              iconLeft={IconArrowRight}
              form={'round'}
              onClick={() =>
                setDate((prevState) => {
                  return add(prevState, { months: 1 });
                })
              }
            />
          </div>
        </div>

        <header className={styles.Calendar__calendarHeader}>
          {weekDayNames.map((name, index) => (
            <Text key={`${name}/${index}`}>{name}</Text>
          ))}
        </header>
        <div className={styles.Calendar__cells}>
          {datesCells.map((cell, idx) => (
            <div key={idx}>
              {cell === undefined ? (
                <div className={styles.Calendar__cells__voidCell}></div>
              ) : (
                <div className={styles.Calendar__cells__ordersCell}>
                  <Text>{new Date(cell.date).toLocaleDateString()}</Text>
                  {cell.orders.length > 0 && (
                    <div
                      className={styles.Calendar__cells__ordersCell__statuses}
                    >
                      {cell.orders.map((ord, ordIdx) => (
                        <div
                          className={cx(styles.Calendar__cells__orderStatus, {
                            created:
                              ord.status === OrderProcessingStatusEnum.CREATED,
                            consideration:
                              ord.status ===
                              OrderProcessingStatusEnum.CONSIDERATION,
                            inWork:
                              ord.status === OrderProcessingStatusEnum.IN_WORK,
                            ready:
                              ord.status === OrderProcessingStatusEnum.READY,
                            completed:
                              ord.status ===
                              OrderProcessingStatusEnum.COMPLETED,
                            rejected:
                              ord.status === OrderProcessingStatusEnum.REJECTED,
                            delivery:
                              ord.status === OrderProcessingStatusEnum.DELIVERY,
                          })}
                          key={ordIdx}
                          onClick={() => {
                            setActiveOrder(ord);
                            setModal(true);
                          }}
                        >
                          {ord.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <Modal isOpen={modal} onClickOutside={() => setModal(false)}>
          <AdministrationOrderModal
            onClose={() => {
              setModal(false);
            }}
            order={activeOrder}
          />
        </Modal>
      </section>
    </MainWrapper>
  );
};

export default AdministrationCalendar;
