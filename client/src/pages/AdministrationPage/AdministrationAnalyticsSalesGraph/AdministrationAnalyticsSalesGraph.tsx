import React from 'react';
import { Line } from '@consta/charts/Line';
import styles from './AdministrationAnalyticsSalesGraph.styl';
import { Text } from '@consta/uikit/Text';
import { Loader } from '@consta/uikit/Loader';

interface IComponentProps {
  lineGraphData: {
    date_completed: string;
    type: string;
    id: number;
    allPrice: number;
    constPrice: number;
    name: string;
  }[];
  isLoading: boolean;
}

const AdministrationAnalyticsSalesGraph: React.FC<IComponentProps> = ({
  lineGraphData,
  isLoading,
}) => {
  return (
    <div className={styles.Graph}>
      <Text size={'3xl'}>Стастистика продаж</Text>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {lineGraphData.some((it) => it.id !== null) ? (
            <Line
              data={lineGraphData}
              xField={'date_completed'}
              yField={'allPrice'}
              className={styles.line}
              seriesField="type"
              color={['#51dd00', '#fa2e00']}
              tooltip={{
                fields: ['name', 'allPrice'],
                formatter: (datum: any) => {
                  return {
                    name: `${datum.name}`,
                    value: `${datum.allPrice},00 ₽`,
                  };
                },
              }}
            />
          ) : (
            <Text align={'center'}>Данные для графика отсутствуют</Text>
          )}
        </>
      )}
      {!isLoading && (
        <div className={styles.Graph__rows}>
          <div className={styles.Graph__rows__row}>
            <Text weight={'semibold'}>Тип заказа</Text>
            <Text weight={'semibold'}>Имя</Text>
            <Text weight={'semibold'}>Дата выдачи</Text>
            <Text weight={'semibold'}>Полная стоимость</Text>
            <Text weight={'semibold'}>Себестоимость</Text>
          </div>
          {lineGraphData.some((it) => it.id !== null) ? (
            lineGraphData
              .filter((itm) => itm.id !== null)
              .map((item, index) => (
                <div className={styles.Graph__rows__row} key={index}>
                  <Text>{item.type}</Text>
                  <Text>{item.name}</Text>
                  <Text>{item.date_completed}</Text>
                  <Text>{item.allPrice},00 ₽</Text>
                  <Text>
                    {item.constPrice ? `${item.constPrice},00 ₽` : '-'}
                  </Text>
                </div>
              ))
          ) : (
            <Text align={'center'}>Данные отсутствуют</Text>
          )}
        </div>
      )}
    </div>
  );
};

export default AdministrationAnalyticsSalesGraph;
