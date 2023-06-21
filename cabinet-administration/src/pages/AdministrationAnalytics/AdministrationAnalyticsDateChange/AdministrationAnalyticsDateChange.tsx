import React, { SetStateAction, useMemo } from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { getMonth } from 'date-fns';
import { rusMonths } from 'src/utils/constants';
import { add, sub } from 'date-fns';
import styles from './AdministrationAnalyticsDateChange.styl';
interface IComponentProps {
  date: Date;
  setDate: React.Dispatch<SetStateAction<Date>>;
}

const AdministrationAnalyticsDateChange: React.FC<IComponentProps> = ({
  date,
  setDate,
}) => {
  const month = useMemo(() => {
    return getMonth(date);
  }, [date]);
  return (
    <div className={styles.Change}>
      <Text size={'3xl'}>Месяц</Text>
      <div className={styles.Change__actions}>
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
  );
};

export default AdministrationAnalyticsDateChange;
